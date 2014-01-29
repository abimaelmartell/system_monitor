window.App = window.App || {};
(function(){
  window.App.Router = Backbone.Router.extend({
    routes: {
      '': 'dashboard',
      'processes': 'processes',
      'network': 'network'
    },
    initialize: function(){
      this.$el = $("#main");
    },
    dashboard: function(){
      var dashboardView = new App.DashboardView();
      this.$el.html(dashboardView.render().$el.html());
      $("#cpus-table, #file-systems-table").dataTable({
        "bPaginate": false,
        "bFilter": false
      });
    },
    processes: function(){
      var processesView = new App.ProcessesView();
      this.$el.html(processesView.render().$el.html());
      $("#processes-table").dataTable({
        aaSorting: [[3, "desc"]],
        iDisplayLength: 25
      });
    },
    network: function(){
      var networkView = new App.NetworkView();
      this.$el.html(networkView.render().$el.html());
      $("#network-interfaces-table").dataTable();
    }
  });
})();
