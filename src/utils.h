#define MAC_ADDRESS_FORMAT "%02X:%02X:%02X:%02X:%02X:%02X"
#define MAC_ADDRESS_STRING_LENGTH 18

extern char *inet_to_string(sigar_t *sigar, sigar_uint32_t inet);
extern char *mac_address_to_string(unsigned char mac[8]);
