window.App = window.App || {};
(function(){
  var appRouter = new window.App.Router();
  App.Stats.fetch({
    success: function(){
      Backbone.history.start();
    }
  });
})();
