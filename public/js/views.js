window.App = window.App || {};
(function() {

    App.HomeView = Backbone.View.extend({
        el: "#main",

        template: JST['templates/home.html'],

        events: {
            'click #processes-table tbody tr': 'show_process'
        },

        initialize: function() {
            App.Stats.on('change', this.render, this);
        },

        render: function() {
            this.$el.html(this.template({ stats: App.Stats.toJSON() }));

            this.render_grids();
        },

        render_grids: function() {
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
            return this;
        },

        show_process: function(ev) {
            var pid = $(ev.currentTarget).find('td').first().text()
              , process = App.Stats.findProcessByPID(pid)
              , view = new App.ProcessView({ model: process });

            view.render();

            /* show the modal */
            $("#process-modal")
                .modal()
                .on('hidden.bs.modal', function() {
                    view.destroy();
                });
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
