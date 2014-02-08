// © 2014 Abimael Martell
// System Monitor - multi-platform system monitor
// See LICENSE

#include "system_monitor.h"

struct mg_server *server;

void initialize_server(void){
  char tmpBuf[100];
  server = mg_create_server(NULL);

  mg_set_option(server, "listening_port", globalOptions.port);
  mg_set_option(server, "run_as_user", "root");
  mg_set_option(server, "document_root", "public");

  mg_set_request_handler(server, request_handler);

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

int request_handler(struct mg_connection *conn){
  char tmpBuf[1024];

  sprintf(tmpBuf, "%s %s from %s", conn->request_method, conn->uri, conn->remote_ip);

  log_line(tmpBuf, LOG_INFO);

  if(strcmp(STATS_JSON_URI, conn->uri) == 0){
    return stats_json(conn);
  }

  return MG_REQUEST_NOT_PROCESSED;
}

int stats_json(struct mg_connection *conn){
  json_object *stats_json;
  char *stats_string;

  stats_json = get_stats_json();

  stats_string = (char *) json_object_to_json_string(stats_json);

  mg_send_header(conn, "Content-type", "application/json; charset=utf-8");

  mg_send_data(
    conn,
    stats_string,
    strlen(stats_string)
  );

  json_object_put(stats_json);

  return MG_REQUEST_PROCESSED;
}
