window.App = window.App || {};
(function(){
  Stats = function(){
    var _this = this;

    this.url = "/stats.json";

    this.fetch = function(success){
      $.getJSON(this.url, function(response){
        _this.attributes = response;
        if(_.isFunction(success))
          success();
      });
    };

    this.getCPUUsagePercent = function(){
      var percent = 0;
      for(core in this.attributes.cpu.cores){
        percent += (100 - ((this.attributes.cpu.cores[core].idle * 100) / this.attributes.cpu.cores[core].total));
      }
      return Math.floor(percent / this.attributes.cpu.total_cores);
    };
  
    this.getDiskUsagePercent = function(){
      var main_fs = _.findWhere(this.attributes.file_systems, {dir: "/"});
      if(main_fs)
        return main_fs.usage.use_percent * 100;
    }
  
    this.getUptimeString = function(){
      return App.Utils.parseSecondsToTimeAgo(this.attributes.uptime);
    }

    this.calculateLoadAveragePercent = function(){
      var load_average_parsed = new Array()
        , load_average_percent;

      for(i in this.attributes.load_average)
        load_average_parsed.push({
          load_average: (this.attributes.load_average[i]).toFixed(2),
          percent: Math.round(this.attributes.load_average[i] * 100 / this.attributes.cpu.total_cores)
        })

      return load_average_parsed;
    }

    this.toJSON = function(){
      var attributes = _.clone(this.attributes);
      attributes.cpu_usage_percent = this.getCPUUsagePercent();
      attributes.disk_usage_percent = this.getDiskUsagePercent();
      attributes.uptime_string = this.getUptimeString();
      attributes.load_average = this.calculateLoadAveragePercent();
      return attributes;
    }
  }

  App.Stats = new Stats;
})();
