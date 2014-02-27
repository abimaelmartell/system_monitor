// © 2014 Abimael Martell
// System Monitor - multi-platform system monitor
// See LICENSE

#include <string.h>
#include <stdio.h>
#include <getopt.h>
#include <time.h>

#include <sigar.h>
#include <sigar_private.h>
#include <sigar_util.h>
#include <mongoose.h>
#include <json.h>

#include "web.h"
#include "utils.h"
#include "resources.h"

enum log_levels{
  LOG_WARNING,
  LOG_INFO,
  LOG_ERROR
};

#define LOG_INFO_LINE "[%s] %s"
#define CONST_RFC1945_TIME_FORMAT "%a, %d %b %Y %H:%M:%S GMT"

struct global_options{
  char *port;
  time_t start_time;
};

extern sigar_t *sigar;
extern struct global_options globalOptions;

extern void log_line(char *line, int level);
extern json_object * get_stats_json();
extern void parse_arguments(int argc, char **argv);
