/**
 * Web stuff...
 */


// handles each http request
extern int request_handler(
    void *cls, struct MHD_Connection *connection, 
    const char *url, const char *method, const char *version, 
    const char *upload_data, size_t *upload_data_size, void **con_cls);
