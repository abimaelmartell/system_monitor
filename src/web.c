#include "system_stats.h"

struct mg_server *server;

void initialize_server(void){
  char tmpBuf[100];
  server = mg_create_server(NULL);

  mg_set_option(server, "listening_port", DEFAULT_HTTP_PORT);
  mg_set_option(server, "document_root", "public");

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
