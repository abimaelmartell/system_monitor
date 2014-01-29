window.App = window.App || {};
(function(){
  App.ProcessesView = Backbone.View.extend({
    template: _.template($("#processes-template").html()),
    render: function(){
      this.$el.html(this.template(App.Stats.toJSON()));
      return this;
    }
  });
})()
