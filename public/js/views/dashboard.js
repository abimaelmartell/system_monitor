window.App = window.App || {};
(function(){
  App.DashboardView = Backbone.View.extend({
    template: _.template($('#dashboard-template').html()),
    render: function(){
      this.$el.html(this.template(App.Stats.toJSON()));
      return this; 
    }
  });
})();
