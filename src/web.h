#define DEFAULT_HTTP_PORT "3000"

extern struct mg_server *server;

extern void initialize_server(void);
extern void stop_server(void);

extern int stats_all_json(struct mg_connection *conn);
