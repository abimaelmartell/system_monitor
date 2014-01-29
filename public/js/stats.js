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
    }
  });
})();
