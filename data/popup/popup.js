var background = (function () {
  var _tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    for (var id in _tmp) {
      if (_tmp[id] && (typeof _tmp[id] === "function")) {
        if (request.path === 'background-to-popup') {
          if (request.method === id) _tmp[id](request.data);
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {_tmp[id] = callback},
    "send": function (id, data) {chrome.runtime.sendMessage({"path": 'popup-to-background', "method": id, "data": data})}
  }
})();


var init = function () {
  var addStatus = function (e) {
    var status = document.getElementById("status");
    status.textContent = e.target.getAttribute('title') || 'Custom Style Script';
  };
  /*  */
  var removeStatus = function (e) {
    var status = document.getElementById("status");
    status.textContent = 'Custom Style Script';
  };
  /*  */
  var state = document.getElementById("state");
  var options = document.getElementById("options");
  var support = document.getElementById("support");
  /*  */
  background.send("store-data");
  state.addEventListener("mouseenter", addStatus);
  window.removeEventListener("load", init, false);
  options.addEventListener("mouseenter", addStatus);
  support.addEventListener("mouseenter", addStatus);
  state.addEventListener("mouseleave", removeStatus);
  options.addEventListener("mouseleave", removeStatus);
  support.addEventListener("mouseleave", removeStatus);
  state.addEventListener("click", function () {background.send("state")});
  options.addEventListener("click", function () {background.send("options")});
  support.addEventListener("click", function () {background.send("support")});
};

window.addEventListener("load", init, false);

background.receive("store-data", function (e) {
  var state = document.getElementById("state");
  state.setAttribute("state", e);
});
