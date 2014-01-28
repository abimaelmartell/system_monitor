(function($, window, undefined){
  var SystemStats = function(){

    var stats_json_url = "/stats.json",
        _this = this;

    this.statsJSON = {};

    this.init = function(){
      this.configure();
      this.fetchStats();
    }

    this.configure = function(){
      $.dynatableSetup({
        features: {
          pushState: false
        },
        dataset: {
          perPageDefault: 20
        }
      });
    }

    this.fetchStats = function(){
      $.getJSON(stats_json_url, function(response){
        _this.statsJSON = response;
        _this.renderStats();
      })
    }

    this.renderStats = function(){
      this.renderMemory();
      this.renderFileSystem();
      this.renderCPU();
      this.renderProcesses();
      this.renderNetworkInterfaces();
      this.renderUptime();
      this.renderNetworkInfo();
      this.renderSystemInfo();
    }

    this.renderMemory = function(){
      $("[data-display='ram-usage-percent']").text(this.statsJSON.memory.used_percent + "%");
      $("[data-display='ram-total']").text(this.statsJSON.memory.total + " MB");
      $("[data-display='ram-used']").text((this.statsJSON.memory.used / 1024 / 1024).toFixed(2) + " MB");
      $("[data-display='ram-free']").text((this.statsJSON.memory.free / 1024 / 1024).toFixed(2) + " MB");
    }

    this.renderFileSystem = function(){
      var main_fs;

      for(fs in this.statsJSON.file_systems){
        if(this.statsJSON.file_systems[fs].dir == "/"){
          main_fs = this.statsJSON.file_systems[fs];
        }
      }

      $("[data-display='disk-usage-percent']").text((main_fs.usage.use_percent * 100 ) + "%");

      var template = _.template($("#file-systems-template").html());
      $("#file-systems-table tbody").html(template({file_systems: this.statsJSON.file_systems}));
      $("#file-systems-table").dynatable({
        features: {
          paginate: false,
          search: false
        }
      });
    }

    this.renderCPU = function(){
      var use_percent = 0;
      var core_usage = new Array();
      for(core in this.statsJSON.cpu.cores){
        core_usage[core] = 100 - ((this.statsJSON.cpu.cores[core].idle * 100) / this.statsJSON.cpu.cores[core].total);
      }

      var total_average = 0;
      for(core in core_usage){
        total_average = total_average + core_usage[core];
      }
      total_average  = Math.floor(total_average / core_usage.length);
      $("[data-display='cpu-usage-percent']").text(total_average + "%");
      $("[data-display='cpu-info']").text(this.statsJSON.cpu.vendor + " " + this.statsJSON.cpu.model);
    }

    this.renderProcesses = function(){
      var template = _.template($("#process-template").html());
      $("#processes-table tbody").html(template({processes: this.statsJSON.processes}));
      $("#processes-table").dynatable();
    }

    this.renderNetworkInterfaces = function(){
      var template = _.template($("#network-interfaces-template").html());
      $("#network-interfaces-table tbody").html(template({network_interfaces: this.statsJSON.network_interfaces}));
      $("#network-interfaces-table").dynatable({
        features: {
          paginate: false,
          search: false
        }
      });
    }

    this.renderUptime = function(){
      var secondsInAMinute = 60,
          secondsInAnHour = 60 * secondsInAMinute,
          secondaInADay = 24 * secondsInAnHour,
          days, uptime_string = "";

      days = Math.floor(this.statsJSON.uptime / secondaInADay);

      hourSeconds = this.statsJSON.uptime % secondaInADay;
      hours = Math.floor(hourSeconds / secondsInAnHour);

      minuteSeconds = hourSeconds % secondsInAnHour;
      minutes = Math.floor(minuteSeconds / secondsInAMinute);

      remainingSecods = minuteSeconds % secondsInAMinute;
      seconds = Math.ceil(remainingSecods);

      if(days)
        uptime_string += days + " days, ";

      if(hours)
        uptime_string += hours + " hours, ";

      if(minutes)
        uptime_string += minutes + " minutes, ";

      if(seconds)
        uptime_string += seconds + " seconds";

      $("[data-display='uptime']").text(uptime_string);
    }

    this.renderNetworkInfo = function(){
        $("[data-display='hostname']").text(this.statsJSON.network_info.host_name)
    }

    this.renderSystemInfo = function(){
        var os_string;
        $("[data-display='architecture']").text(this.statsJSON.system_info.arch)

        os_string = this.statsJSON.system_info.name + " " + this.statsJSON.system_info.version + " " + this.statsJSON.system_info.description + " " + this.statsJSON.system_info.arch;
        $("[data-display='os']").text(os_string);
    }

    return this.init();
  };

  window.system_stats = new SystemStats;
})(jQuery, window);
