#include <string.h>
#include <stdio.h>

#include <sigar.h>
#include <mongoose.h>
#include <json-c/json.h>

#include "web.h"

enum log_levels{
  LOG_WARNING,
  LOG_INFO,
  LOG_ERROR
};

extern sigar_t *sigar;

extern void log_line(char *line, int level);
