// © 2014 Abimael Martell
// System Monitor - multi-platform system monitor
// See LICENSE

#include "system_monitor.h"

struct mg_server *server;

void initialize_server (void)
{
    char tmpBuf[100];
    server = mg_create_server(NULL);

    mg_set_option(server, "listening_port", globalOptions.port);
    mg_set_option(server, "run_as_user", "root");

    #ifdef DEBUG
    mg_set_option(server, "document_root", "public");
    #endif

    mg_set_request_handler(server, request_handler);

    sprintf(
        tmpBuf,
        "Initialized web server at port %s",
        mg_get_option(server, "listening_port")
    );

    log_line(tmpBuf, LOG_INFO);

    for (;;) {
        mg_poll_server(server, 1000);
    }
}

void stop_server (void)
{
    mg_destroy_server(&server);
}

int request_handler (struct mg_connection *conn)
{
    char tmpBuf[MAX_BUFFER_SIZE];

    snprintf(tmpBuf, sizeof(tmpBuf), "%s %s from %s", conn->request_method, conn->uri, conn->remote_ip);

    log_line(tmpBuf, LOG_INFO);

    if (strcmp(STATS_JSON_URI, conn->uri) == 0) {
        return stats_json(conn);
    }

    #ifndef DEBUG
    // serve assets from resources.c
    size_t asset_size;
    int is_modified = 0;
    const char *asset_content = NULL, *if_modifier_since_header = NULL,
               *extension;
    char date_str[48], cache_control[58], expires[48], last_modified[48];
    time_t current_time, expires_time, if_modified_time, modified_time;
    struct tm *current_time_tm, *expires_tm, if_modifier_since, *last_modified_tm;

    last_modified_tm = gmtime(&globalOptions.start_time);
    strftime(last_modified, sizeof(last_modified), CONST_RFC1945_TIME_FORMAT, last_modified_tm);

    if_modifier_since_header = mg_get_header(conn, "If-Modified-Since");

    if (if_modifier_since_header) {
        strptime(if_modifier_since_header, CONST_RFC1945_TIME_FORMAT, &if_modifier_since);
        if_modified_time = mktime(&if_modifier_since);
        modified_time = mktime(last_modified_tm);

        if (modified_time <= if_modified_time) {
            mg_send_status(conn, 304);
            is_modified = 1;
        }
    }

    if (strcmp("/", conn->uri) == 0) {
        asset_content = find_embedded_file("public/index.html", &asset_size);
        mg_send_header(conn, "Content-Type", "text/html; charset=utf-8");
    } else {
        snprintf(tmpBuf, sizeof(tmpBuf), "public%s", conn->uri);
        asset_content = find_embedded_file(tmpBuf, &asset_size);

        if (asset_content != NULL) {
            extension = strrchr(tmpBuf, '.');

            if (strcmp(extension, ".js") == 0) {
                mg_send_header(conn, "Content-Type", "application/x-javascript; charset=utf-8");
            } else if (strcmp(extension, ".css") == 0) {
                mg_send_header(conn, "Content-Type", "text/css; charset=utf-8");
            }
        }
    }

    if (asset_content != NULL) {
        current_time = time(NULL);
        current_time_tm = gmtime(&current_time);
        strftime(date_str, sizeof(date_str), CONST_RFC1945_TIME_FORMAT, current_time_tm);

        sprintf(cache_control, "max-age=%d, public", CACHE_LIMIT);

        expires_time = time(NULL) + CACHE_LIMIT;
        expires_tm = gmtime(&expires_time);
        strftime(expires, sizeof(expires), CONST_RFC1945_TIME_FORMAT, expires_tm);

        mg_send_header(conn, "Date", date_str);
        mg_send_header(conn, "Cache-Control", cache_control);
        mg_send_header(conn, "Vary", "Accept-Encoding");
        mg_send_header(conn, "Expires", expires);

        if (is_modified == 0) {
            mg_send_header(conn, "Last-Modified", last_modified);
            mg_send_data(conn, asset_content, asset_size);
        } else {
            // close connection
            mg_send_data(conn, "\r\n", 2);
        }

        return MG_REQUEST_PROCESSED;
    }
    #endif

    return MG_REQUEST_NOT_PROCESSED;
}

int stats_json (struct mg_connection *conn)
{
    json_object *stats_json = NULL;
    char *stats_string = NULL;

    stats_json = get_stats_json();

    stats_string = (char *) json_object_to_json_string(stats_json);

    mg_send_header(conn, "Content-Type", "application/json; charset=utf-8");
    mg_send_header(conn, "Cache-Control", "no-cache");

    mg_send_data(
        conn,
        stats_string,
        strlen(stats_string)
    );

    json_object_put(stats_json);

    return MG_REQUEST_PROCESSED;
}
