#include "system_stats.h"

struct mg_server *server;

void initialize_server(void){
  char tmpBuf[100];
  server = mg_create_server(NULL);

  mg_set_option(server, "listening_port", DEFAULT_HTTP_PORT);
  mg_set_option(server, "run_as_user", "root");
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
  sigar_file_system_list_t file_system_list;
  sigar_file_system_usage_t file_system_usage;
  json_object *stats_json, *memory_json, *cpu_json, *cores_json, *core_json,
              *file_system_json, *file_systems_json, *file_system_usage_json;
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

  sigar_cpu_info_list_get(sigar, &cpu_info_list);
  cpu_json = json_object_new_object();
  json_object_object_add(cpu_json, "vendor", json_object_new_string(cpu_info_list.data[0].vendor));
  json_object_object_add(cpu_json, "model", json_object_new_string(cpu_info_list.data[0].model));
  json_object_object_add(cpu_json, "mhz", json_object_new_int(cpu_info_list.data[0].mhz));
  json_object_object_add(cpu_json, "total_cores", json_object_new_int(cpu_info_list.data[0].total_cores));
  sigar_cpu_info_list_destroy(sigar, &cpu_info_list);

  sigar_cpu_list_get(sigar, &cpu_list);
  cores_json = json_object_new_array();
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
  sigar_cpu_list_destroy(sigar, &cpu_list);

  sigar_file_system_list_get(sigar, &file_system_list);
  file_systems_json = json_object_new_array();
  for(i = 0; i < file_system_list.number; i++){
    file_system_json = json_object_new_object();
    json_object_object_add(file_system_json, "dir", json_object_new_string(file_system_list.data[i].dir_name));
    json_object_object_add(file_system_json, "dev", json_object_new_string(file_system_list.data[i].dev_name));
    json_object_object_add(file_system_json, "type", json_object_new_string(file_system_list.data[i].type_name));
    json_object_object_add(file_system_json, "sys_type", json_object_new_string(file_system_list.data[i].sys_type_name));
    json_object_object_add(file_system_json, "options", json_object_new_string(file_system_list.data[i].options));

    file_system_usage_json = json_object_new_object();
    sigar_file_system_usage_get(sigar, file_system_list.data[i].dir_name, &file_system_usage);
    json_object_object_add(file_system_usage_json, "use_percent", json_object_new_double(file_system_usage.use_percent));
    json_object_object_add(file_system_usage_json, "total", json_object_new_int((int) file_system_usage.total));
    json_object_object_add(file_system_usage_json, "free", json_object_new_int64(file_system_usage.free));
    json_object_object_add(file_system_usage_json, "used", json_object_new_int64(file_system_usage.used));
    json_object_object_add(file_system_usage_json, "available", json_object_new_int64(file_system_usage.avail));
    json_object_object_add(file_system_usage_json, "files", json_object_new_int64(file_system_usage.files));
    json_object_object_add(file_system_json, "usage", file_system_usage_json);

    json_object_array_add(file_systems_json, file_system_json);
  }
  json_object_object_add(stats_json, "file_system", file_systems_json);
  sigar_file_system_list_destroy(sigar, &file_system_list);

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
