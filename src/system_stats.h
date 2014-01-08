#include <microhttpd.h>
#include <string.h>
#include <stdio.h>

#include "web.h"

#define DEFAULT_HTTP_PORT 3000

struct globalOptions{
  int port;
} globalOptions;

extern struct globalOptions options;
