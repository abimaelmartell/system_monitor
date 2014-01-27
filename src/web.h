#define DEFAULT_HTTP_PORT "3000"

#define STATS_JSON_URI "/stats.json"

extern struct mg_server *server;

extern void initialize_server(void);
extern void stop_server(void);

extern int stats_json(struct mg_connection *conn);
extern int index_html(struct mg_connection *conn);