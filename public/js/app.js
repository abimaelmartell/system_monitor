window.App = window.App || {};
(function(){
  $.dynatableSetup({
    dataset: {
      perPageDefault: 20
    }
  });

  var appRouter = new window.App.Router();
  App.Stats.fetch({
    success: function(){
      Backbone.history.start({pushState: true});
    }
  });
})();
