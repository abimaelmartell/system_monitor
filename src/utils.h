// © 2014 Abimael Martell
// System Monitor - multi-platform system monitor
// See LICENSE

#define MAC_ADDRESS_FORMAT "%02X:%02X:%02X:%02X:%02X:%02X"
#define MAC_ADDRESS_STRING_LENGTH 18

extern char *inet_to_string (sigar_uint32_t inet);
extern char *mac_address_to_string (unsigned char mac[8]);
extern void url_encode(const char *src, char *dst, size_t dst_len);
