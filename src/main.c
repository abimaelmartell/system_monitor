// © 2014 Abimael Martell
// System Monitor - multi-platform system monitor
// See LICENSE

#include "system_monitor.h"

int main(int argc, char **argv){
  parse_arguments(argc, argv);

  initialize_server();

  stop_server(); 

  return 0;
}
