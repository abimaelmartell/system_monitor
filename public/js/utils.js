window.App = window.App || {};
(function(){
  
    App.Utils = {};

    App.Utils.parseSecondsToTimeAgo = function(seconds){
        var secondsInAMinute = 60
          , secondsInAnHour = 60 * secondsInAMinute
          , secondaInADay = 24 * secondsInAnHour
          , days, ago_string = "";

        days = Math.floor(seconds / secondaInADay);

        hourSeconds = seconds % secondaInADay;
        hours = Math.floor(hourSeconds / secondsInAnHour);

        minuteSeconds = hourSeconds % secondsInAnHour;
        minutes = Math.floor(minuteSeconds / secondsInAMinute);

        remainingSecods = minuteSeconds % secondsInAMinute;
        seconds = Math.ceil(remainingSecods);

        if(days)
            ago_string += days + " days, ";
        
        if(hours)
            ago_string += hours + " hours, ";
    
        if(minutes)
            ago_string += minutes + " minutes, ";
    
        if(seconds)
            ago_string += seconds + " seconds";
    
        return ago_string;
    }

    App.Utils.convertBytes = function(bytes, sizes){
        var sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        if (bytes == 0) return 0;
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        if (i == 0) { return (bytes / Math.pow(1024, i)) + ' ' + sizes[i]; }
        return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
    }

    App.Utils.reader = function(el) {
        return Number(el.innerHTML) || 0;
    }

    App.Utils.writer = function(record) {
        return record[this.id] ? App.Utils.convertBytes(record[this.id]) : 0;
    }

})();
