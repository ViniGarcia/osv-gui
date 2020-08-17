var Settings = require("../Settings"),
    BaseBox = require("./BaseBox"),
    OS = require("../API/OS"),
    Click = require("../API/Applications/Click/Click"),
    helpers = require("../helpers");

//Set refresh
function ClickEditorBox() {

}

//Proto
ClickEditorBox.prototype = Object.create(BaseBox.prototype);

ClickEditorBox.prototype.template = "/osv/templates/boxes/EditorBox.html";

ClickEditorBox.prototype.title = "Editor - NF Uploader";

ClickEditorBox.prototype.refresh = function () {
  var container =$(this.selector),
    template = this.getTemplate();
 this.fetchData().then(function(data) {
  	var context = { title: ClickEditorBox.prototype.title, funcNow : data };
    container.html(template(context));
  });
};

ClickEditorBox.prototype.fetchData = function() {
	//console.log("Read File");
	return $.when(
		Click.readFile()
		)
};

ClickEditorBox.prototype.getHtml = function() {
  var template = this.getTemplate();
  //console.log("Get Template");
  return this.fetchData().then(function(data) {
  	var context = { title: ClickEditorBox.prototype.title, funcNow : data };
    console.log(context);
    return template(context);
  });
};

ClickEditorBox.prototype.clear = function() {
  clearInterval(this.interval);
  $(this.selector).remove();
};

module.exports = ClickEditorBox;