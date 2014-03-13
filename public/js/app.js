window.App = window.App || {};
(function() {

    // disable push state for dynatable
    $.dynatableSetup({
        features: {
            pushState: false
        }
    });

    var Router = Backbone.Router.extend({
        routes: {
            "": "home",
            "process/:id": "process"
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

        process: function(pid) {
            var process = App.Stats.findProcessByPID(pid)
              , view = new App.ProcessView({ model: process });

            view.render();

            var _this = this;

            $("#process-modal")
                .modal()
                .on('hidden.bs.modal', function() {
                    if ($("#main").is(":empty")) {
                        _this.navigate('', {trigger: true, replace: true});
                    } else {
                        _this.navigate('', {trigger: false, replace: true});
                    }
                })
            ;
        },

        renderView: function(view) {
            if(this.currentView){
                this.currentView.$el.empty();
                this.currentView.unbind();
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
