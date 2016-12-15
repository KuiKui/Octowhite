$(function() {
  var urlToReload     = getUrlToReload();
  var whitespaceUrl   = getWhitespaceUrl(urlToReload);
  var noWhitespaceUrl = getNoWhitespaceUrl(urlToReload);

  var buttonGroup = $('<div class="diffbar-item"><div class="BtnGroup"></div></div>');

  if (hasNoWhitespaceParam()) {
    var whitespace   = $('<a class="btn btn-sm btn-outline BtnGroup-item tooltipped tooltipped-s" href="' + whitespaceUrl + '" aria-label="View whitespace diff">Whitespace</a>');
    var noWhitespace = $('<button type="button" class="btn btn-sm btn-outline BtnGroup-item tooltipped tooltipped-s bg-gray-light text-gray-light" href="' + noWhitespaceUrl + '" aria-label="Hide whitespace diff" disabled="">No whitespace</button>');
  } else {
    var whitespace   = $('<button type="button" class="btn btn-sm btn-outline BtnGroup-item tooltipped tooltipped-s bg-gray-light text-gray-light" href="' + whitespaceUrl + '" aria-label="View whitespace diff" disabled="">Whitespace</button>');
    var noWhitespace = $('<a class="btn btn-sm btn-outline BtnGroup-item tooltipped tooltipped-s" href="' + noWhitespaceUrl + '" aria-label="Hide whitespace diff">No whitespace</a>');
  }

  buttonGroup.append(whitespace);
  buttonGroup.append(noWhitespace)
  buttonGroup.insertBefore($('.pr-review-tools > div.diffbar-item').first());
});

function hasNoWhitespaceParam() {
  return getURLParameter('w') !== null; // Right now w can have any value as long is present gh will remove whitespace
}

function getWhitespaceUrl(url) {
  return removeParameter(url, 'w');
}

function getNoWhitespaceUrl(url) {
  return insertParameter(url, 'w', '1');
}

function getUrlToReload() {
  var url = document.location.href;

  // No PR
  if (url.indexOf("/pull/") == -1) {
    return url;
  }

  // PR on files tab
  if (url.indexOf("/files") > -1) {
    return url;
  }

  // PR on commits tab
  if (url.indexOf("/commits") > -1) {
    return url.replace(/commits/g, 'files');;
  }

  // PR on conversation tab
  return document.location.origin + document.location.pathname + '/files' + document.location.search
}
