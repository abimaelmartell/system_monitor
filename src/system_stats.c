#include "system_stats.h"

sigar_t *sigar;

void log_line(char *line, int log_level){
  puts(line);
}

json_object * get_stats_json(){
  sigar_t *sigar;
  sigar_mem_t memory;
  sigar_cpu_list_t cpu_list;
  sigar_cpu_info_list_t cpu_info_list;
  sigar_file_system_list_t file_system_list;
  sigar_file_system_usage_t file_system_usage;
  sigar_net_interface_list_t net_interface_list;
  sigar_net_interface_config_t net_interface_config, net_interface_primary;
  sigar_net_interface_stat_t net_interface_stat;
  sigar_uptime_t uptime;
  json_object *stats_json, *memory_json, *cpu_json, *cores_json, *core_json,
              *file_system_json, *file_systems_json, *file_system_usage_json,
              *net_interfaces_json, *net_interface_json, *net_interface_address_json,
              *net_interface_stat_json;
  char *stats_string;
  int i, primary_interface;

  sigar_open(&sigar);
  sigar_mem_get(sigar, &memory);

  stats_json = json_object_new_object();

  memory_json = json_object_new_object();
  json_object_object_add(memory_json, "total", json_object_new_int64(memory.ram));
  json_object_object_add(memory_json, "free", json_object_new_int64(memory.free));
  json_object_object_add(memory_json, "used", json_object_new_int64(memory.used));
  json_object_object_add(memory_json, "used_percent", json_object_new_int64(memory.used_percent));

  json_object_object_add(stats_json, "memory", memory_json);

  sigar_cpu_info_list_get(sigar, &cpu_info_list);
  cpu_json = json_object_new_object();
  json_object_object_add(cpu_json, "vendor", json_object_new_string(cpu_info_list.data[0].vendor));
  json_object_object_add(cpu_json, "model", json_object_new_string(cpu_info_list.data[0].model));
  json_object_object_add(cpu_json, "mhz", json_object_new_int(cpu_info_list.data[0].mhz));
  json_object_object_add(cpu_json, "total_cores", json_object_new_int(cpu_info_list.data[0].total_cores));
  sigar_cpu_info_list_destroy(sigar, &cpu_info_list);

  sigar_cpu_list_get(sigar, &cpu_list);
  cores_json = json_object_new_array();
  for(i = 0; i < cpu_list.number; i++){
    core_json = json_object_new_object();
    json_object_object_add(core_json, "user",  json_object_new_int64(cpu_list.data[i].user));
    json_object_object_add(core_json, "idle",  json_object_new_int64(cpu_list.data[i].idle));
    json_object_object_add(core_json, "nice",  json_object_new_int64(cpu_list.data[i].nice));
    json_object_object_add(core_json, "irq",   json_object_new_int64(cpu_list.data[i].irq));
    json_object_object_add(core_json, "sys",   json_object_new_int64(cpu_list.data[i].sys));
    json_object_object_add(core_json, "total", json_object_new_int64(cpu_list.data[i].total));
    json_object_array_add(cores_json, core_json);
  }
  json_object_object_add(cpu_json, "cores", cores_json);
  json_object_object_add(stats_json, "cpu", cpu_json);
  sigar_cpu_list_destroy(sigar, &cpu_list);

  sigar_file_system_list_get(sigar, &file_system_list);
  file_systems_json = json_object_new_array();
  for(i = 0; i < file_system_list.number; i++){
    file_system_json = json_object_new_object();
    json_object_object_add(file_system_json, "dir", json_object_new_string(file_system_list.data[i].dir_name));
    json_object_object_add(file_system_json, "dev", json_object_new_string(file_system_list.data[i].dev_name));
    json_object_object_add(file_system_json, "type", json_object_new_string(file_system_list.data[i].type_name));
    json_object_object_add(file_system_json, "sys_type", json_object_new_string(file_system_list.data[i].sys_type_name));
    json_object_object_add(file_system_json, "options", json_object_new_string(file_system_list.data[i].options));

    file_system_usage_json = json_object_new_object();
    sigar_file_system_usage_get(sigar, file_system_list.data[i].dir_name, &file_system_usage);
    json_object_object_add(file_system_usage_json, "use_percent", json_object_new_double(file_system_usage.use_percent));
    json_object_object_add(file_system_usage_json, "total", json_object_new_int((int) file_system_usage.total));
    json_object_object_add(file_system_usage_json, "free", json_object_new_int64(file_system_usage.free));
    json_object_object_add(file_system_usage_json, "used", json_object_new_int64(file_system_usage.used));
    json_object_object_add(file_system_usage_json, "available", json_object_new_int64(file_system_usage.avail));
    json_object_object_add(file_system_usage_json, "files", json_object_new_int64(file_system_usage.files));
    json_object_object_add(file_system_json, "usage", file_system_usage_json);

    json_object_array_add(file_systems_json, file_system_json);
  }
  json_object_object_add(stats_json, "file_systems", file_systems_json);
  sigar_file_system_list_destroy(sigar, &file_system_list);

  sigar_net_interface_config_primary_get(sigar, &net_interface_primary);

  sigar_net_interface_list_get(sigar, &net_interface_list);

  net_interfaces_json = json_object_new_array();

  for(i = 0; i < net_interface_list.number; i++){
    primary_interface = 0;
    sigar_net_interface_config_get(sigar, net_interface_list.data[i], &net_interface_config);

    if(strcmp(net_interface_config.name, net_interface_primary.name) == 0){
      primary_interface = 1;
    }

    net_interface_json = json_object_new_object();

    json_object_object_add(net_interface_json, "name", json_object_new_string(net_interface_config.name));
    json_object_object_add(net_interface_json, "type", json_object_new_string(net_interface_config.type));
    json_object_object_add(net_interface_json, "primary", json_object_new_boolean(primary_interface));


    net_interface_address_json = json_object_new_object();
    json_object_object_add(net_interface_address_json, "ip", json_object_new_string(inet_to_string(sigar, net_interface_config.address.addr.in)));
    json_object_object_add(net_interface_address_json, "mac", json_object_new_string(mac_address_to_string(net_interface_config.hwaddr.addr.mac)));
    json_object_object_add(net_interface_json, "address", net_interface_address_json);

    net_interface_stat_json = json_object_new_object();
    sigar_net_interface_stat_get(sigar, net_interface_config.name, &net_interface_stat);
    json_object_object_add(net_interface_stat_json, "speed", json_object_new_int64(net_interface_stat.speed));
    json_object_object_add(net_interface_stat_json, "rx_packets", json_object_new_int64(net_interface_stat.rx_packets));
    json_object_object_add(net_interface_stat_json, "tx_packets", json_object_new_int64(net_interface_stat.tx_packets));
    json_object_object_add(net_interface_stat_json, "rx_bytes", json_object_new_int64(net_interface_stat.rx_bytes));
    json_object_object_add(net_interface_stat_json, "tx_bytes", json_object_new_int64(net_interface_stat.tx_bytes));
    json_object_object_add(net_interface_json, "stat", net_interface_stat_json);

    json_object_array_add(net_interfaces_json, net_interface_json);
  }

  json_object_object_add(stats_json, "network_interfaces", net_interfaces_json);

  sigar_uptime_get(sigar, &uptime);
  json_object_object_add(stats_json, "uptime", json_object_new_double(uptime.uptime));

  sigar_close(sigar);

  return stats_json;
}