$(document).ready(function() {
  var urlToReload     = getUrlToReload();
  var whitespaceUrl   = getWhitespaceUrl(urlToReload);
  var noWhitespaceUrl = getNoWhitespaceUrl(urlToReload);

  var buttons            = $('<div class="button-group right octowhite" data-ga-load="Diff, view, Viewed Unified Diff"></div>');
  var whitespaceButton   = $('<a class="minibutton" href="' + whitespaceUrl + '">Whitespace</a>');
  var noWhitespaceButton = $('<a class="minibutton" href="' + noWhitespaceUrl + '">No whitespace</a>');

  if (hasNoWhitespaceParam()) {
    noWhitespaceButton.addClass('selected');
    whitespaceButton.removeClass('selected');
  } else {
    whitespaceButton.addClass('selected');
    noWhitespaceButton.removeClass('selected');
  }

  buttons.append(whitespaceButton).append(noWhitespaceButton);
  buttons.insertBefore($('#toc>div').first().next());
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
