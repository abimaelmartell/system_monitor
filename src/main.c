#include "system_stats.h"

int main(int argc, char *argv[]){
  struct mg_server *server;

  server = mg_create_server(NULL);
  mg_set_option(server, "listening_port", "8080");
  mg_set_option(server, "document_root", "public");

  printf("Starting on port %s\n", mg_get_option(server, "listening_port"));
  for (;;) {
    mg_poll_server(server, 1000);
  }

  // Cleanup, and free server instance
  mg_destroy_server(&server);

  return 0;
}
