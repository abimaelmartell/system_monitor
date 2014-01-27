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

  return 0;
}
