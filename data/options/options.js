var codeArray = [];

var background = (function () {
  var _tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    for (var id in _tmp) {
      if (_tmp[id] && (typeof _tmp[id] === "function")) {
        if (request.path == 'background-to-options') {
          if (request.method === id) _tmp[id](request.data);
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {_tmp[id] = callback},
    "send": function (id, data) {chrome.runtime.sendMessage({"path": 'options-to-background', "method": id, "data": data})}
  }
})();

var storedata = function () {
  filltable({"codeArray": codeArray});
  background.send("store-data", {"codeArray": codeArray});
};

var additem = function () {
  var inputarea = document.getElementById("input-field");
  var url = inputarea.children[0].children[0];
  var script = inputarea.children[1].children[0];
  var style = inputarea.children[2].children[0];
  var obj = {"url": '', "checked_d": true, "checked_t": true, "checked_i": false, "script": '', "style": '', "state": 'active', "scriptUrl": '', "styleUrl": ''};
  try {obj.url = (url.value === '*') ? '*' : new URL(url.value).href} catch (e) {obj.url = 'about:blank'}
  /*  */
  url.value = obj.url;
  obj.style = style.value;
  obj.script = script.value;
  codeArray = codeArray.filter(function (e) {return e.url !== obj.url || e.script !== obj.script || e.style !== obj.style});
  codeArray.push(obj);
  storedata();
};

var filltable = function (o) {
  var count = 1;
  codeArray = o.codeArray ? o.codeArray : [];
  var CWP = document.getElementById('o-w-page');
  if (o.CWP && CWP) CWP.checked = o.CWP;
  var tbody = document.getElementById('code-array-tbody');
  tbody.textContent = '';
  /*  */
  for (var i = codeArray.length - 1; i >= 0; i--) {
    var url = document.createElement('td');
    var top = document.createElement('td');
    var close = document.createElement('td');
    var number = document.createElement('td');
    var domain = document.createElement('td');
    var iFrame = document.createElement('td');
    var toggle = document.createElement('td');
    var itemTop = document.createElement('tr');
    var styleUrl = document.createElement('td');
    var styleCode = document.createElement('td');
    var scriptUrl = document.createElement('td');
    var itemBottom = document.createElement('tr');
    var scriptCode = document.createElement('td');
    var input_d = document.createElement('input');
    var input_t = document.createElement('input');
    var input_i = document.createElement('input');
    var itemSeperator = document.createElement('tr');
    /*  */
    url.setAttribute('type', 'url');
    top.setAttribute('type', 'check');
    close.setAttribute('type', 'close');
    domain.setAttribute('type', 'check');
    iFrame.setAttribute('type', 'check');
    number.setAttribute('type', 'number');
    toggle.setAttribute('type', 'toggle');
    styleCode.setAttribute('type', 'style');
    scriptCode.setAttribute('type', 'script');
    /*  */
    var textarea = document.createElement('textarea');
    textarea.setAttribute("placeholder", "Add URL (i.e. https://www.google.com/)");
    textarea.value = codeArray[i].url || 'about:blank';
    textarea.setAttribute("type", "url");
    url.appendChild(textarea);
    /*  */
    var textarea = document.createElement('textarea');
    textarea.setAttribute("placeholder", "Add CSS code.");
    textarea.value = codeArray[i].style || '';
    textarea.setAttribute("type", "style");
    styleCode.appendChild(textarea);
    /*  */
    var textarea = document.createElement('textarea');
    textarea.setAttribute("placeholder", "Add JS code.");
    textarea.value = codeArray[i].script || '';
    textarea.setAttribute("type", "script");
    scriptCode.appendChild(textarea);
    /*  */
    input_t.setAttribute('type', 'checkbox');
    input_t.checked = codeArray[i].checked_t;
    input_t.setAttribute('rule', 'top');
    top.appendChild(input_t);
    /*  */
    input_d.setAttribute('type', 'checkbox');
    input_d.checked = codeArray[i].checked_d;
    input_d.setAttribute('rule', 'domain');
    domain.appendChild(input_d);
    /*  */
    input_i.setAttribute('type', 'checkbox');
    input_i.checked = codeArray[i].checked_i;
    input_i.setAttribute('rule', 'iFrame');
    iFrame.appendChild(input_i);
    /*  */
    number.textContent = count;
    itemTop.setAttribute('clickedItem', i);
    itemBottom.setAttribute('clickedItem', i);
    itemSeperator.setAttribute('clickedItem', i);
    toggle.setAttribute('state', codeArray[i].state);
    itemTop.setAttribute('state', codeArray[i].state);
    itemBottom.setAttribute('state', codeArray[i].state);
    itemSeperator.setAttribute('state', codeArray[i].state);
    /*  */
    itemTop.appendChild(number);
    itemTop.appendChild(url);
    itemTop.appendChild(domain);
    itemTop.appendChild(top);
    itemTop.appendChild(iFrame);
    itemTop.appendChild(scriptCode);
    itemTop.appendChild(styleCode);
    itemTop.appendChild(toggle);
    itemTop.appendChild(close);
    tbody.appendChild(itemTop);
    /*  */
    var textarea = document.createElement('textarea');
    textarea.value = codeArray[i].scriptUrl || '';
    textarea.setAttribute("placeholder", "Add online JS link (i.e. https://code.jquery.com/jquery-2.2.1.min.js) for the above item.");
    textarea.setAttribute("type", "scriptUrl");
    scriptUrl.appendChild(textarea);
    /*  */
    var textarea = document.createElement('textarea');
    textarea.value = codeArray[i].styleUrl || '';
    textarea.setAttribute("placeholder", "Add online CSS link (i.e. https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css) for the above item");
    textarea.setAttribute("type", "styleUrl");
    styleUrl.appendChild(textarea);
    /*  */
    scriptUrl.setAttribute('type', 'link');
    styleUrl.setAttribute('type', 'link');
    itemBottom.appendChild(document.createElement('td'));
    itemBottom.appendChild(document.createElement('td'));
    itemBottom.appendChild(document.createElement('td'));
    itemBottom.appendChild(document.createElement('td'));
    itemBottom.appendChild(document.createElement('td'));
    itemBottom.appendChild(scriptUrl);
    itemBottom.appendChild(styleUrl);
    itemBottom.appendChild(document.createElement('td'));
    tbody.appendChild(itemBottom);
    /*  */
    itemSeperator.appendChild(document.createElement('td'));
    itemSeperator.appendChild(document.createElement('td'));
    itemSeperator.appendChild(document.createElement('td'));
    itemSeperator.appendChild(document.createElement('td'));
    itemSeperator.appendChild(document.createElement('td'));
    itemSeperator.appendChild(document.createElement('td'));
    itemSeperator.appendChild(document.createElement('td'));
    itemSeperator.appendChild(document.createElement('td'));
    itemSeperator.appendChild(document.createElement('td'));
    itemSeperator.appendChild(document.createElement('td'));
    itemSeperator.appendChild(document.createElement('td'));
    tbody.appendChild(itemSeperator);
    /*  */
    count++;
  }
  /*  */
  var clickedItem = null;
  var textarea = document.getElementById('code-array-table').querySelectorAll('textarea');
  Array.prototype.slice.call(textarea).map(function (elm) {
    elm.addEventListener('mousedown', function () {clickedItem = this.parentNode.parentNode.getAttribute("clickedItem")});
    elm.addEventListener('change', function (e) {
      var i = Number(clickedItem);
      var tmp = codeArray[i];
      var type = e.target.getAttribute("type");
      tmp[type] = e.target.value;
      codeArray[i] = tmp;
      storedata();
    }, false);
  });
};

var init = function () {
  document.getElementById('code-array-table').addEventListener("click", function (e) {
    if (e.target.tagName.toLowerCase() === 'td' || e.target.nodeName.toLowerCase() === 'td') {
      var tr = e.target.parentNode, url, script, style;
      for (var i = 0; i < tr.children.length; i++) {
        var td = tr.children[i];
        var type = td.getAttribute("type");
        if (type === "url") url = td.children[0].value;
        if (type === "style") style = td.children[0].value;
        if (type === "script") script = td.children[0].value;
      }
      /*  */
      if (e.target.getAttribute('type') === 'close') {
        codeArray = codeArray.filter(function (h) {return !((h.url === url) && (h.script === script) && (h.style === style))});
        storedata();
      }
      /*  */
      if (e.target.getAttribute('type') === 'toggle') {
        for (var k = 0; k < codeArray.length; k++) {
          var h = codeArray[k];
          if (h.url === url && h.script === script && h.style === style) {
            if (tr.getAttribute('state') === 'active') {
              var tmp = tr.parentNode.querySelectorAll('[clickeditem="' + tr.getAttribute("clickedItem") + '"]');
              Array.prototype.slice.call(tmp).map(function (elm) {elm.setAttribute('state', 'inactive')});
              codeArray[k].state = 'inactive';
            } else {
              var tmp = tr.parentNode.querySelectorAll('[clickeditem="' + tr.getAttribute("clickedItem") + '"]');
              Array.prototype.slice.call(tmp).map(function (elm) {elm.setAttribute('state', 'active')});
              codeArray[k].state = 'active';
            }
            break;
          }
        }
        /*  */
        storedata();
      }
    }
    /*  */
    if (e.target.tagName.toLowerCase() === 'input' || e.target.nodeName.toLowerCase() == 'input') {
      if (e.target.getAttribute('type') === 'checkbox') {
        var url, script, style;
        var tr = e.target.parentNode.parentNode;
        for (var i = 0; i < tr.children.length; i++) {
          var td = tr.children[i];
          var type = td.getAttribute("type");
          if (type === "url") url = td.children[0].value;
          if (type === "style") style = td.children[0].value;
          if (type === "script") script = td.children[0].value;
        }
        for (var j = 0; j < codeArray.length; j++) {
          var h = codeArray[j];
          if (h.url === url && h.script === script && h.style === style) {
            if (e.target.getAttribute('rule') === 'top') codeArray[j].checked_t = e.target.checked;
            if (e.target.getAttribute('rule') === 'domain') codeArray[j].checked_d = e.target.checked;
            if (e.target.getAttribute('rule') === 'iFrame') codeArray[j].checked_i = e.target.checked;
            break;
          }
        }
        /*  */
        storedata();
      }
    }
  });
  /*  */
  background.send("retrieve-data");
  window.removeEventListener("load", init, false);
  background.receive("retrieve-data", filltable);
  document.getElementById('input-field-add').addEventListener("click", additem);
};

window.addEventListener("load", init, false);
