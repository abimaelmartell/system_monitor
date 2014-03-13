window.App = window.App || {};
(function() {

    App.HomeView = Backbone.View.extend({
        el: "#main",

        template: JST['templates/home.html'],

        events: {
            'click #processes-table tbody tr': 'show_process'
        },

        render: function() {
            this.$el.html(this.template({ stats: App.Stats.toJSON() }));
            return this;
        },

        show_process: function(ev) {
            var pid = $(ev.currentTarget).find('td').first().text();

            App.Router.navigate('process/' + pid, {trigger: true, replace: true});
        }
    });

    App.ProcessView = Backbone.View.extend({
        el: "#modal-container",

        template: JST['templates/process.html'],

        render: function() {
            this.$el.html(this.template({ process: this.model }));
            return this;
        }
    });

})();
