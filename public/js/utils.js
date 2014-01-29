window.App = window.App || {};
(function(){
  App.Utils = {};

  App.Utils.parseSecondsToTimeAgo = function(seconds){
    var secondsInAMinute = 60,
      secondsInAnHour = 60 * secondsInAMinute,
      secondaInADay = 24 * secondsInAnHour,
      days, ago_string = "";

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

  App.Utils.convertBytes = function(bytes, to){
    var return_val;
    if(typeof to === 'undefined')
      to = 'mb';

    if(to == 'mb')
      return_val = bytes / 1024 / 1024;

    return Math.floor(return_val);
  }

})();
