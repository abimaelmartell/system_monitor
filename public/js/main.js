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
    }

    this.renderMemory = function(){
      $("[data-display='ram-usage-percent']").text(this.statsJSON.memory.used_percent + "%");
    }

    this.renderFileSystem = function(){
      var main_fs;

      for(fs in this.statsJSON.file_systems){
        if(this.statsJSON.file_systems[fs].dir == "/"){
          main_fs = this.statsJSON.file_systems[fs];
        }
      }

      $("[data-display='disk-usage-percent']").text((main_fs.usage.use_percent * 100 ) + "%");
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
    }

    this.renderProcesses = function(){
      var template = _.template($("#process-template").html());
      $("#processes-table tbody").html(template({processes: this.statsJSON.processes}));
      $("#processes-table").dynatable();
    }

    return this.init();
  };

  window.system_stats = new SystemStats;
})(jQuery, window);
