var background = (function () {
  var _tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    for (var id in _tmp) {
      if (_tmp[id] && (typeof _tmp[id] === "function")) {
        if (request.path === 'background-to-page') {
          if (request.method === id) _tmp[id](request.data);
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {_tmp[id] = callback},
    "send": function (id, data) {chrome.runtime.sendMessage({"path": 'page-to-background', "method": id, "data": data})}
  }
})();

var init = function (data) {
  if (data.state === "enabled") {
    for (var i = 0; i < data.array.length; i++) {
      if (data.array[i].state === "active") {
        try {
          var top = data.array[i].checked_i ? data.top : (data.array[i].checked_t ? document.location.href : '');
          if (top) {
            var url = data.array[i].url, flag = false;
            if (url === '*') flag = true;
            else {
              if (data.array[i].checked_d) {
                url = new URL(data.array[i].url).hostname;
                flag = (top.indexOf(url) !== -1);
              } else flag = (top === url);
            }
            /*  */
            if (flag) {
              var style = document.getElementById("custom-style-code-" + i);
              var script = document.getElementById("custom-script-code-" + i);
              var styleUrl = document.getElementById("custom-style-link-" + i);
              var scriptUrl = document.getElementById("custom-script-link-" + i);
              /*  */
              if (style)  style.parentNode.removeChild(style);
              if (script) script.parentNode.removeChild(script);
              if (styleUrl) styleUrl.parentNode.removeChild(styleUrl);
              if (scriptUrl) scriptUrl.parentNode.removeChild(scriptUrl);
              if (data.array[i].script) { /* script::code */
                script = document.createElement("script");
                script.setAttribute("id", "custom-script-code-" + i);
                script.setAttribute("type", "text/javascript");
                script.textContent = data.array[i].script;
                document.documentElement.appendChild(script);
              }
              if (data.array[i].scriptUrl) { /* script::link */
                scriptUrl = document.createElement("script");
                scriptUrl.setAttribute("id", "custom-script-link-" + i);
                scriptUrl.setAttribute("type", "text/javascript");
                scriptUrl.src = data.array[i].scriptUrl;
                document.documentElement.appendChild(scriptUrl);
              }
              if (data.array[i].style) { /* style::code */
                style = document.createElement("style");
                style.setAttribute("id", "custom-style-code-" + i);
                style.setAttribute("type", "text/css");
                style.textContent = data.array[i].style;
                document.documentElement.appendChild(style);
              }
              if (data.array[i].styleUrl) { /* style::link */
                styleUrl = document.createElement("link");
                styleUrl.setAttribute("id", "custom-style-link-" + i);
                styleUrl.setAttribute("rel", "stylesheet");
                styleUrl.setAttribute("type", "text/css");
                styleUrl.href = data.array[i].styleUrl;
                document.documentElement.appendChild(styleUrl);
              }
            }
          }
        } catch (e) {}
      }
    }
  }
};

background.receive("storage-data", init);
background.send("storage-data", {"href": document.location.href});
