// © 2014 Abimael Martell
// System Monitor - multi-platform system monitor
// See LICENSE

#include <string.h>
#include <stdio.h>
#include <getopt.h>

#include <sigar.h>
#include <sigar_private.h>
#include <sigar_util.h>
#include <mongoose.h>
#include <json.h>

#include "web.h"
#include "utils.h"

enum log_levels{
  LOG_WARNING,
  LOG_INFO,
  LOG_ERROR
};

struct global_options{
  char *port;
};

extern sigar_t *sigar;
extern struct global_options globalOptions;

extern void log_line(char *line, int level);
extern json_object * get_stats_json();
extern void parse_arguments(int argc, char **argv);
