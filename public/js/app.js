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
            var view = this.renderView(new App.HomeView);

            // init dynatable
            $("#cpus-table").dynatable();

            $("#file-systems-table").dynatable({
                readers: {
                    total: App.Utils.reader,
                    free: App.Utils.reader,
                    used: App.Utils.reader,
                    available: App.Utils.reader,
                    files: App.Utils.reader
                },
                writers: {
                    total: App.Utils.writer,
                    free: App.Utils.writer,
                    used: App.Utils.writer,
                    available: App.Utils.writer
                }
            });

            $("#processes-table").dynatable({
                readers: {
                    pid: App.Utils.reader,
                    memory: App.Utils.reader,
                    threads: App.Utils.reader
                },
                writers: {
                    memory: App.Utils.writer
                }
            });

            $("#network-interfaces-table").dynatable({
                readers: {
                    speed: App.Utils.reader,
                    transmitted: App.Utils.reader,
                    received: App.Utils.reader,
                    transmittedPackets: App.Utils.reader,
                    receivedPackets: App.Utils.reader
                },
                writers: {
                    speed: App.Utils.writer,
                    transmitted: App.Utils.writer,
                    received: App.Utils.writer
                }
            });
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
            Backbone.history.start();
        })
    ;
})();
