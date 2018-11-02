window.setTimeout(function () {
  var version = config.welcome.version;
  if (!version) {
    app.tabs.open(config.welcome.url + '?v=' + app.version() + "&type=install");
    config.welcome.version = app.version();
  }
}, config.welcome.timeout);

var toolbaricon = function (state) {
  app.button.label = "Custom Style Script: " + state;
  app.button.icon = {
    "path": {
      "16": "../../data/icons/" + state + "/16.png",
      "32": "../../data/icons/" + state + "/32.png",
      "48": "../../data/icons/" + state + "/48.png",
      "64": "../../data/icons/" + state + "/64.png"
    }
  };
};

app.popup.receive("state", function () {
  config.addon.state = config.addon.state === 'disabled' ? 'enabled' : 'disabled';
  app.popup.send("store-data", config.addon.state);
  toolbaricon(config.addon.state);
});

app.content_script.receive("storage-data", function (e) {
  app.content_script.send("storage-data", {
    "array": config.code.array,
    "state": config.addon.state
  }, (e ? e.tabId : null));
});

app.options.receive("retrieve-data", function () {
  app.options.send("retrieve-data", {
    "codeArray": config.code.array,
    "CWP": config.welcome.page,
    "CAL": config.addon.log
  });
});

app.popup.receive("options", app.tabs.openOptions);
window.setTimeout(function () {toolbaricon(config.addon.state)}, 300);
app.popup.receive("support", function () {app.tabs.open(config.welcome.url)});
app.options.receive("store-data", function (o) {config.code.array = o.codeArray});
app.popup.receive("store-data", function () {app.popup.send("store-data", config.addon.state)});
