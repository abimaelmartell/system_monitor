#include "system_stats.h"

int main(int argc, char *argv[]){
  struct MHD_Daemon *daemon;

  daemon = MHD_start_daemon(
    MHD_USE_THREAD_PER_CONNECTION, DEFAULT_HTTP_PORT, NULL, NULL,
    &request_handler, NULL, MHD_OPTION_END
  );

  if(NULL == daemon)
    return 1;

  getchar();
  MHD_stop_daemon(daemon);
  return 0;
}
