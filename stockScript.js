// stockScript.js

function inputNumberFormatVal(value) {
  return comma(uncomma(value));
}

function inputNumberFormat(obj) {
  obj.value = comma(uncomma(obj.value));
}

function comma(str) {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
}

function uncomma(str) {
  str = String(str);
  return str.replace(/[^\d]+/g, "");
}

function inputNumberFormatVal2(value) {
  return comma2(uncomma2(value));
}

function inputNumberFormat2(obj) {
  //obj.value = comma2(uncomma2(obj.value));
  obj.value = uncomma2(obj.value);
}

function comma2(str) {
  str = String(str);
  var parts = str.toString().split(".");
  return parts[0].replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,") + (parts[1] ? "." + parts[1] : "");

  //alert("111");

  //var parts = str.toString().split(".");
  //return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
}

function uncomma2(str) {
  str = String(str);
  var parts = str.toString().split(".");

  var result;
  if (parts.length == 1) {
    result = parts[0].replace(/[^\d]+/g, "");
  } else {
    result = parts[0].replace(/[^\d]+/g, "") + (parts[1] ? "." + parts[1] : "");
  }

  return result;
}

////////////////////

function inputNumberFormatPoint(obj) {
  var cursor = getPositionOfCursor(obj); // ì»¤ì„œ?? ?„ì¹˜ ê°??¸ì˜¤ê¸?.
  var beforeLength = obj.value.length; // ?ë˜ ?ìŠ¤?¸ì˜ ?„ì²´ ê¸¸ì´
  obj.value = thousandSeparatorCommas(obj.value); // ì½¤ë§ˆ ì¶”ê??´ì„œ, ?ìŠ¤?? ë°”ê¿”ì£¼ê¸°
  var afterLength = obj.value.length; // ë°”ë?? ?ìŠ¤?¸ì˜ ?„ì²´ ê¸¸ì´
  var gap = afterLength - beforeLength;

  // ì»¤ì„œ?? ?„ì¹˜ ë°”ê¾¸ê¸?.
  if (obj.selectionStart) {
    obj.selectionStart = cursor.start + gap;
    obj.selectionEnd = cursor.end + gap;
  } else if (obj.createTextRange) {
    var start = cursor.start - beforeLength;
    var end = cursor.end - beforeLength;

    var range = obj.createTextRange();

    range.collapse(false);
    range.moveStart("character", start);
    range.moveEnd("character", end);
    range.select();
  }
}

function getPositionOfCursor(tag) {
  var position = { start: 0, end: 0 };

  if (tag.selectionStart) {
    // ie 10 ?´ìƒ & ê·¸ì™¸ ë¸Œë¼?°ì?.
    position.start = tag.selectionStart;
    position.end = tag.selectionEnd;
  } else if (document.selection) {
    // ie 9 ?´í•˜.
    var range = document.selection.createRange();
    var copyRange = range.duplicate();
    copyRange.expand("textedit");
    copyRange.setEndPoint("EndToEnd", range);

    var start = copyRange.text.length - range.text.length;
    var end = start - range.text.length;

    position.start = parseInt(start);
    position.end = parseInt(end);
  }

  return position;
}

function thousandSeparatorCommas(number) {
  var string = "" + number; // ë¬¸ìë¡? ë°”ê¾¸ê¸?.
  string = string.replace(/[^-+\.\d]/g, ""); // Â±ê¸°í˜¸?? ?Œìˆ˜??, ?«ì?¤ë§Œ ?¨ê¸°ê³? ?„ë? ì§??°ê¸°.
  var regExp = /^([-+]?\d+)(\d{3})(\.\d+)?/; // ?„ìš”?? ?•ê·œ??.

  while (regExp.test(string)) string = string.replace(regExp, "$1" + "," + "$2" + "$3"); // ?¼í‘œ ?½ì….

  return string;
}

// ?´ë¦½ë³´ë“œ url ë³µì‚¬
function clip() {
  var url = "";
  var textarea = document.createElement("textarea");
  document.body.appendChild(textarea);
  url = window.document.location.href;
  textarea.value = url;
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  alert("URL?? ë³µì‚¬?˜ì—ˆ?µë‹ˆ??.");
}

// ?¤í¬ë¦°ìƒ·
function screenShot(id, imgName) {
  $("#" + id).prepend("<p id='imgTitle'> " + imgName + " </p>");
  html2canvas($("#" + id)[0]).then(function (canvas) {
    var myImage = canvas.toDataURL();
    downloadURI(myImage, imgName + ".png");
    $("#imgTitle").remove();
  });
  function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
  }
}