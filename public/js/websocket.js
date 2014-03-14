window.App = window.App || {};
(function() {

    App.WebSocket = function(){
        this.url = "ws://" + location.host;

        this.ws = new WebSocket(this.url);

        this.ws.onopen = this.onOpen;
        this.ws.onmessage = this.onMessage;
    };

    App.WebSocket.prototype.onOpen = function(ev) {
        console.log(ev);
    };

    App.WebSocket.prototype.onMessage = function(ev) {
        var data = ev.data;

        if (data) {
            var stats = JSON.parse(data);
            
            if (_.isObject(stats)) {
                App.Stats.set( stats );
            }
        }
    };

})();
