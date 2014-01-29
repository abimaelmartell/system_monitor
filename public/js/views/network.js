window.App = window.App || {};
(function(){
  App.NetworkView = Backbone.View.extend({
    template: _.template($("#network-template").html()),
    render: function(){
      this.$el.html(this.template(App.Stats.toJSON()));
      return this;
    }
  });
})();
