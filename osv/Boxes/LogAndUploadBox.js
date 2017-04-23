var Settings = require("../Settings"),
    BaseBox = require("./BaseBox"),
    OS = require("../API/OS"),
    Click = require("../API/Applications/Click/Click"),
    helpers = require("../helpers"),
    oldData;

//Set refresh
function LogAndUploadBox() {
  this.interval = setInterval(this.refresh.bind(this), 1000)
}

//Proto
LogAndUploadBox.prototype = Object.create(BaseBox.prototype);

LogAndUploadBox.prototype.template = "/osv/templates/boxes/LogAndUploadBox.html";

LogAndUploadBox.prototype.title = "Log";

LogAndUploadBox.prototype.refresh = function () {
  var container =$(this.selector),
    template = this.getTemplate();
    var text = container.find("textarea").val();
 this.fetchData().then(function(data) {
  if(text != data){
    console.log("Refreshing Log");
    var context = { title: LogAndUploadBox.prototype.title, logText : data };
    container.html(template(context));
  };
  });
};


LogAndUploadBox.prototype.fetchData = function() {
	return $.when(
		Click.log()
		)
};

LogAndUploadBox.prototype.getHtml = function() {
  var template = this.getTemplate();
  return this.fetchData().then(function(data) {
  	var context = { title: LogAndUploadBox.prototype.title, logText : data };
    return template(context);
  });
};



LogAndUploadBox.prototype.clear = function() {
  clearInterval(this.interval);
  $(this.selector).remove();
};

module.exports = LogAndUploadBox;
