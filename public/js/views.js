window.App = window.App || {};
(function() {

    App.HomeView = Backbone.View.extend({
        template: JST['templates/home.html'],

        events: {
            'click button': 'refresh_stats'
        },

        render: function() {
            this.el = this.template({ stats: App.Stats.toJSON() });
            return this;
        }
    });

})();
