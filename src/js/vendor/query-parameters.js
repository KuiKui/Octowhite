// Some Utility methods

// Barely based on http://stackoverflow.com/questions/486896/adding-a-parameter-to-the-url-with-javascript
function insertParameter(url, key, value) {
  key = encodeURIComponent(key); value = encodeURIComponent(value);

  var s = removeParameter(url, key); // We remove it in case is there already
  var kvp = key+"="+value;

  s += (s.indexOf('?') !== -1 ? '&' : '?') + kvp;

  return s;
}

// Stolen from http://stackoverflow.com/questions/1634748/how-can-i-delete-a-query-string-parameter-in-javascript
function removeParameter(url, parameter) {
  var urlparts= url.split('?');

  if (urlparts.length>=2) {
    var urlBase=urlparts.shift(); //get first part, and remove from array
    var queryString=urlparts.join("?"); //join it back up

    var prefix = encodeURIComponent(parameter)+'=';
    var pars = queryString.split(/[&;]/g);
    if (pars.length > 0) {
      for (var i= pars.length; i-->0;)               //reverse iteration as may be destructive
        if (pars[i].lastIndexOf(prefix, 0)!==-1)   //idiom for string.startsWith
          pars.splice(i, 1);
      url = urlBase+'?'+pars.join('&');
    }
  }

  // remove trailing ?
  if(url.substr(-1) == '?') {
    url = url.substr(0, url.length - 1);
  }

  return url;
}

// From http://stackoverflow.com/questions/1403888/get-url-parameter-with-jquery
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(document.location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}
