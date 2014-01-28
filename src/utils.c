#include "system_monitor.h"

char *inet_to_string(sigar_t *sigar, sigar_uint32_t inet){
  char address[SIGAR_INET6_ADDRSTRLEN], *address_ptr;
  int rc;

  rc = sigar_inet_ntoa(sigar, inet, address);
  if(rc == SIGAR_OK){
    address_ptr = strdup(address);
    return address_ptr;
  }

  return NULL;
}

char *mac_address_to_string(unsigned char mac[8]){
  char mac_string[MAC_ADDRESS_STRING_LENGTH], *mac_ptr;

  snprintf(
    mac_string,
    sizeof(mac_string),
    MAC_ADDRESS_FORMAT,
    (mac[0] & 0xff), (mac[1] & 0xff), (mac[2] & 0xff),
    (mac[3] & 0xff), (mac[4] & 0xff), (mac[5] & 0xff)
  );

  mac_ptr = strdup(mac_string);
  
  return mac_ptr;
}
