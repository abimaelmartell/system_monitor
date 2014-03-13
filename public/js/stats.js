window.App = window.App || {};
(function() {

    var StatsModel = Backbone.Model.extend({
        url: "/stats.json",
        
        initialize: function() {
        },

        getCPUUsagePercent: function(){
            var percent = 0;
            for(core in this.attributes.cpu.cores){
                percent += (100 - ((this.attributes.cpu.cores[core].idle * 100) / this.attributes.cpu.cores[core].total));
            }
            return Math.floor(percent / this.attributes.cpu.total_cores);
        },

        getDiskUsagePercent: function() {
            var main_fs = _.findWhere(this.attributes.file_systems, {dir: "/"});
            if(main_fs)
                return Math.round(main_fs.usage.use_percent * 100);
        },

        getUptimeString: function() {
            return App.Utils.parseSecondsToTimeAgo(this.attributes.uptime);
        },

        calculateLoadAveragePercent: function() {
            var load_average_parsed = new Array()
              , load_average_percent;

            for(i in this.attributes.load_average)
                load_average_parsed.push({
                    load: (this.attributes.load_average[i]).toFixed(2),
                    percent: Math.round(this.attributes.load_average[i] * 100 / this.attributes.cpu.total_cores)
                })

            return load_average_parsed;
        },

        findProcessByPID: function(pid){
            return _.find(this.attributes.processes, function(el){
                return pid == el.pid;
            });
        },

        toJSON: function() {
            var attributes = _.clone(this.attributes);
            attributes.cpu_usage_percent = this.getCPUUsagePercent();
            attributes.disk_usage_percent = this.getDiskUsagePercent();
            attributes.uptime_string = this.getUptimeString();
            attributes.load_average = this.calculateLoadAveragePercent();
            return attributes;
        }
    });

    App.Stats = new StatsModel;

})();
