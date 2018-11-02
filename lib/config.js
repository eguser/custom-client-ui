var config = {};

config.code = {
  set array (val) {app.storage.write('code', JSON.stringify(val))},
  get array () {
    var tmp = app.storage.read("code");
    return !tmp ? [] : JSON.parse(tmp);
  }
};

config.welcome = {
  "timeout": 3000,
  get version () {return app.storage.read('version')},
  set version (val) {app.storage.write('version', val)},
  "url": "http://mybrowseraddon.com/custom-style-script.html",
};

config.addon = {
  set state (val) {app.storage.write("state", val)},
  get state () {
    var tmp = app.storage.read("state");
    return (!tmp || tmp === 'undefined' || typeof tmp === 'undefined') ? 'enabled' : tmp;
  }
};

config.get = function (name) {return name.split('.').reduce(function (p, c) {return p[c]}, config)};

config.set = function (name, value) {
  function set(name, value, scope) {
    name = name.split('.');
    if (name.length > 1) set.call((scope || this)[name.shift()], name.join('.'), value);
    else this[name[0]] = value;
  }
  set(name, value, config);
};
