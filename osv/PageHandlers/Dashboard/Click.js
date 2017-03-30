var BoxesLayout = require("../../Layouts/BoxesLayout"),
    Boxes = require("../../Boxes/Boxes");

function Click() {

  var self = this;

  $(document).on("click", ".nfStart", function () {
  	console.log("NF Start press");
    self.nfStart();    
  });

  $(document).on("click", ".nfStop", function () {
    console.log("NF Stop press");
    self.nfStop();
  });

  $(document).on("click", ".shutdownVM", function () {
    console.log("Shutdown VM press");
    self.shutdownVM();
  });
}

Click.prototype.shutdownVM = function() {
  console.log("shutdownVM exec");
  this.clickInfoBox.vmShutdown();
};

Click.prototype.nfStart = function() {
  console.log("nfStart exec");
  this.clickInfoBox.nfStart();
};

Click.prototype.nfStop = function(){
  console.log("nfStart exec");
  this.clickInfoBox.nfStop();
};

Click.prototype.handler = function() {
	this.clickInfoBox = new Boxes.ClickInfoBox;
  this.clickGraphBox = new Boxes.ClickGraphBox;
  this.clickEditorBox = new Boxes.ClickEditorBox;
  this.layout = new BoxesLayout([
    this.clickInfoBox, this.clickGraphBox,this.clickEditorBox
  ]);
  this.layout.render();
};

module.exports = Click;