window.App = window.App || {};
(function() {

    // disable push state for dynatable
    $.dynatableSetup({
        features: {
            pushState: false
        }
    });

    /**
     * Destroy the view and unbind events
     */
    Backbone.View.prototype.destroy = function() {
        this.$el.empty();
        this.undelegateEvents();
    };

    var Router = Backbone.Router.extend({
        routes: {
            "": "home",
        },

        home: function() {
            this.render_home();

            var _this = this;
            $("[data-action='refresh-stats']").on('click', function() {
                App.Stats.fetch()
                    .done(function() {
                        _this.render_home();
                    })
            });
        },

        render_home: function() {
            this.renderView(new App.HomeView);
        },

        renderView: function(view) {
            if(this.currentView){
                this.currentView.destroy();
            }

            view.render();

            this.currentView = view;

            return view;
        }
    });

    App.Stats.fetch()
        .done(function(){
            App.Router = new Router();

            App.Sync = new App.WebSocket();

            Backbone.history.start();
        })
    ;
})();
