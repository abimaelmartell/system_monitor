#include <string.h>
#include <stdio.h>

#include <sigar.h>
#include <sigar_private.h>
#include <sigar_util.h>
#include <mongoose.h>
#include <json-c/json.h>

#include "web.h"
#include "utils.h"

enum log_levels{
  LOG_WARNING,
  LOG_INFO,
  LOG_ERROR
};

extern sigar_t *sigar;

extern void log_line(char *line, int level);
