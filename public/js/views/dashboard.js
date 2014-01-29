window.App = window.App || {};
(function(){
  App.DashboardView = Backbone.View.extend({
    template: _.template($('#dashboard-template').html()),
    render: function(){
      this.$el.html(this.template(this.get_attributes_object()));
      return this; 
    },
    get_attributes_object: function(){
      var attributes = App.Stats.toJSON();
      attributes.cpu_usage_percent = App.Stats.getCPUUsagePercent();

      return attributes;
    }
  });
})();
