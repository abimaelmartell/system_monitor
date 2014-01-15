#include "system_stats.h"

struct mg_server *server;

void initialize_server(void){
  char tmpBuf[100];
  server = mg_create_server(NULL);

  mg_set_option(server, "listening_port", DEFAULT_HTTP_PORT);
  mg_set_option(server, "document_root", "public");

  mg_add_uri_handler(server, STATS_JSON_URI, &stats_json);

  sprintf(
    tmpBuf,
    "Initialized web server at port %s",
    mg_get_option(server, "listening_port")
  );

  log_line(tmpBuf, LOG_INFO);

  for(;;)
    mg_poll_server(server, 1000);
}

void stop_server(void){
  mg_destroy_server(&server);
}

int stats_json(struct mg_connection *conn){
  sigar_t *sigar;
  sigar_mem_t memory;
  sigar_cpu_list_t cpu_list;
  sigar_cpu_info_list_t cpu_info_list;
  json_object *stats_json, *memory_json, *cpu_json, *cores_json, *core_json;
  char *stats_string;
  int i;

  sigar_open(&sigar);
  sigar_mem_get(sigar, &memory);

  stats_json = json_object_new_object();

  memory_json = json_object_new_object();
  json_object_object_add(memory_json, "total", json_object_new_int64(memory.ram));
  json_object_object_add(memory_json, "free", json_object_new_int64(memory.free));
  json_object_object_add(memory_json, "used", json_object_new_int64(memory.used));

  json_object_object_add(stats_json, "memory", memory_json);

  cpu_json = json_object_new_object();
  sigar_cpu_info_list_get(sigar, &cpu_info_list);
  json_object_object_add(cpu_json, "vendor", json_object_new_string(cpu_info_list.data[0].vendor));
  json_object_object_add(cpu_json, "model", json_object_new_string(cpu_info_list.data[0].model));
  json_object_object_add(cpu_json, "mhz", json_object_new_int(cpu_info_list.data[0].mhz));
  json_object_object_add(cpu_json, "total_cores", json_object_new_int(cpu_info_list.data[0].total_cores));
  sigar_cpu_info_list_destroy(sigar, &cpu_info_list);

  cores_json = json_object_new_array();
  sigar_cpu_list_get(sigar, &cpu_list);
  for(i = 0; i < cpu_list.number; i++){
    core_json = json_object_new_object();
    json_object_object_add(core_json, "user",  json_object_new_int64(cpu_list.data[i].user));
    json_object_object_add(core_json, "idle",  json_object_new_int64(cpu_list.data[i].idle));
    json_object_object_add(core_json, "nice",  json_object_new_int64(cpu_list.data[i].nice));
    json_object_object_add(core_json, "irq",   json_object_new_int64(cpu_list.data[i].irq));
    json_object_object_add(core_json, "sys",   json_object_new_int64(cpu_list.data[i].sys));
    json_object_object_add(core_json, "total", json_object_new_int64(cpu_list.data[i].total));
    json_object_array_add(cores_json, core_json);
  }

  json_object_object_add(cpu_json, "cores", cores_json);


  json_object_object_add(stats_json, "cpu", cpu_json);

  stats_string = (char *) json_object_to_json_string(stats_json);

  sigar_close(sigar);

  mg_send_header(conn, "Content-type", "application/json; charset=utf-8");

  mg_send_data(
    conn,
    stats_string,
    strlen(stats_string)
  );

  return 0;
}
