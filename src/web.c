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
  json_object *stats_json, *memory_json;
  char *stats_string;

  sigar_open(&sigar);
  sigar_mem_get(sigar, &memory);

  stats_json = json_object_new_object();

  memory_json = json_object_new_object();
  json_object_object_add(memory_json, "total", json_object_new_int64(memory.ram));
  json_object_object_add(memory_json, "free", json_object_new_int64(memory.free));
  json_object_object_add(memory_json, "used", json_object_new_int64(memory.used));

  json_object_object_add(stats_json, "memory", memory_json);

  stats_string = (char *) json_object_to_json_string(stats_json);

  sigar_close(sigar);

  mg_send_data(
    conn,
    stats_string,
    strlen(stats_string)
  );

  return 0;
}
