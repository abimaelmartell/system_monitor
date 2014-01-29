window.App = window.App || {};
(function(){
  window.App.Router = Backbone.Router.extend({
    routes: {
      '': 'dashboard'
    },
    initialize: function(){
      this.$el = $("#main");
    },
    dashboard: function(){
      var dashboardView = new App.DashboardView();
      this.$el.html(dashboardView.render().$el.html())
      $("#cpus-table").dynatable({
        features: {
          paginate: false,
          search: false
        }
      });
    }
  });
})();
