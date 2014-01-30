window.App = window.App || {};
(function(){
  var SystemMonitor = function(){
    var _this = this;

    this.template = _.template($("#system-monitor-template").html());

    this.render = function(){
      $("#main").html(this.template(App.Stats.toJSON()));
      $("#processes-table, #file-systems-table").dataTable();
      $("#network-interfaces-table, #cpus-table").dataTable({
        "bPaginate": false,
        "bFilter": false
      });
    }

    this.initEvents = function(){
      $("[data-action='refresh-stats']").on("click", function(){
        var btn = $(this);
        btn.button('loading');
        App.Stats.fetch(function(){
          _this.render();
          btn.button('reset');
        })
      });
    }

    this.init = function(){
      App.Stats.fetch(function(){
        _this.render();
      })
    }

    this.initEvents();

    return this.init();
  }

  window.App.SystemMonitor = new SystemMonitor();
})();
