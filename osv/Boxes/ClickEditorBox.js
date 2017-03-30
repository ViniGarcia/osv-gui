var Settings = require("../Settings"),
    BaseBox = require("./BaseBox"),
    OS = require("../API/OS"),
    Click = require("../API/Applications/Click/Click"),
    helpers = require("../helpers");

//Set refresh
function ClickEditorBox() {
    this.interval = setInterval(this.refresh.bind(this), Settings.DataFetchingRate)
}

//Proto
ClickEditorBox.prototype = Object.create(BaseBox.prototype);

ClickEditorBox.prototype.template = "/osv/templates/boxes/EditorBox.html";

ClickEditorBox.prototype.clear = function() {
  clearInterval(this.interval);
  $(this.selector).remove();
};

ClickEditorBox.prototype.getData = function() {
  return $.when(
    OS.getHostname(),
    Click.version(),
    OS.Memory.free(),
    OS.uptime(),
    Click.running()
  );
};

module.exports = ClickEditorBox;
