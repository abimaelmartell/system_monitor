window.App = window.App || {};
(function(){
  Stats = Backbone.Model.extend({
    url: "/stats.json",
    getCPUUsagePercent: function(){
      var percent = 0;
      for(core in this.attributes.cpu.cores){
        percent += (100 - ((this.attributes.cpu.cores[core].idle * 100) / this.attributes.cpu.cores[core].total));
      }
      return Math.floor(percent / this.attributes.cpu.total_cores);
    },
    getDiskUsagePercent: function(){
      var main_fs = _.findWhere(this.attributes.file_systems, {dir: "/"});
      if(main_fs)
        return main_fs.usage.use_percent * 100;
    },
    getUptimeString: function(){
      return App.Utils.parseSecondsToTimeAgo(this.get("uptime"));
    },
    toJSON: function(){
      var attributes = _.clone(this.attributes);
      attributes.cpu_usage_percent = this.getCPUUsagePercent();
      attributes.disk_usage_percent = this.getDiskUsagePercent();
      attributes.uptime_string = this.getUptimeString();

      return attributes;
    }
  });

  App.Stats = new Stats();  
})();
