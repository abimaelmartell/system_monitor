jQuery.fn.dataTableExt.oSort['file-size-asc']  = function(a,b) {
  var x = a.substring(0,a.length - 2);
  var y = b.substring(0,b.length - 2);
  var x_unit = (a.substring(a.length - 2, a.length) == "MB" ? 1000 : (a.substring(a.length - 2, a.length) == "GB" ? 1000000 : 1));
  var y_unit = (b.substring(b.length - 2, b.length) == "MB" ? 1000 : (b.substring(b.length - 2, b.length) == "GB" ? 1000000 : 1));
  x = parseInt( x * x_unit );
  y = parseInt( y * y_unit );
  return ((x < y) ? -1 : ((x > y) ?  1 : 0));
};

jQuery.fn.dataTableExt.oSort['file-size-desc'] = function(a,b) {
  var x = a.substring(0,a.length - 2);
  var y = b.substring(0,b.length - 2);
  var x_unit = (a.substring(a.length - 2, a.length) == "MB" ? 1000 : (a.substring(a.length - 2, a.length) == "GB" ? 1000000 : 1));
  var y_unit = (b.substring(b.length - 2, b.length) == "MB" ? 1000 : (b.substring(b.length - 2, b.length) == "GB" ? 1000000 : 1));
  x = parseInt( x * x_unit);
  y = parseInt( y * y_unit);
  return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};

jQuery.fn.dataTableExt.aTypes.push(function(sData){
  var sValidChars = "0123456789";
  var Char;
  for(i=0; i<(sData.length - 3); i++){
    Char = sData.charAt(i);
    if (sValidChars.indexOf(Char) == -1)
      return null;
  }

  if(sData.substring(sData.length - 2, sData.length) == "KB"
    || sData.substring(sData.length - 2, sData.length) == "MB"
    || sData.substring(sData.length - 2, sData.length) == "GB")
    return 'file-size';
  return null;
});
