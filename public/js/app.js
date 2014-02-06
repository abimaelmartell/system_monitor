window.App = window.App || {};
(function(){
  var SystemMonitor = function(){
    var _this = this;

    this.template = _.template($("#system-monitor-template").html());

    this.custom_memory_dt = {
      reader: function(el, record){
        return Number(el.innerHTML) || 0;
      },
      writer: function(record){
        return record[this.id] ? App.Utils.convertBytes(record[this.id]) : 'n/a';
      }
    }

    this.render = function(){
      $("#main").html(this.template(App.Stats.toJSON()));
      $("#file-systems-table, #network-interfaces-table, #cpus-table, #processes-table").dynatable();
    }

    this.initEvents = function(){
      $("[data-action='refresh-stats']").on("click", function(){
        var btn = $(this);
        btn.button('loading');
        App.Stats.fetch(function(){
          _this.render();
          btn.button('reset');
        })
      });

      $.dynatableSetup({
        readers: {
          'memory': this.custom_memory_dt.reader,
          'speed': this.custom_memory_dt.reader,
          'transmitted': this.custom_memory_dt.reader,
          'received': this.custom_memory_dt.reader
        },
        writers: {
          'memory': this.custom_memory_dt.writer,
          'speed': this.custom_memory_dt.writer,
          'transmitted': this.custom_memory_dt.writer,
          'received': this.custom_memory_dt.writer
        }
      });
    }

    this.init = function(){
      App.Stats.fetch(function(){
        _this.render();
      })
    }

    this.initEvents();

    return this.init();
  }

  window.App.SystemMonitor = new SystemMonitor();
})();
