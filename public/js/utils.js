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

})();
