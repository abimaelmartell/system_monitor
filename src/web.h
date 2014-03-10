// © 2014 Abimael Martell
// System Monitor - multi-platform system monitor
// See LICENSE

#define DEFAULT_HTTP_PORT "3000"
#define STATS_JSON_URI "/stats.json"

/* Cache limit (seconds) in the browser */
#define CACHE_LIMIT 290304000

extern struct mg_server *server;

extern void initialize_server (void);
extern void stop_server (void);

extern int request_handler (struct mg_connection *conn);
extern int stats_json (struct mg_connection *conn);
