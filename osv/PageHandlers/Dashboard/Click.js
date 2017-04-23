var BoxesLayout = require("../../Layouts/BoxesLayout"),
    Boxes = require("../../Boxes/Boxes");

function Click() {

  var self = this;

  /*
  * ClickInfoBox.js
  */
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

  /*
  * ClickEditorBox.js
  */

  $(document).on("click", ".confUpdate", function(){
    var content = $('#clickFunction');
    //console.log(content.value());
    var blob = new Blob([ content.val() ], {type:'text/plain'});
    var xhr = new XMLHttpRequest();
    var form = new FormData();
    form.append('file',blob);
    xhr.open('POST', '/file//func.click', true);
    xhr.overrideMimeType("multipart/form-data;");
    xhr.send(form);
    alert("Function updated")
    self.refreshEditor();
  });

  $(document).on("click", ".uploadNF", function(){
    var content = $('#newFunction');
    var xhr = new XMLHttpRequest();
    var form = new FormData();
    if(content[0].files[0]){
      form.append('file',content[0].files[0]);
      xhr.open('POST', '/file//func.click',true);
      xhr.overrideMimeType("multipart/form-data;");
      xhr.send(form);
      alert("New function uploaded");
      self.refreshEditor();
    }
    else{
      alert("No files selected");
      self.refreshEditor();
    }
  });

  $(document).on("click", ".confClean", function(){
    if(confirm("This will erase your function. Proceed?")){
      var blob = new Blob([ "" ], {type:'text/plain'});
      var xhr = new XMLHttpRequest();
      var form = new FormData();
      form.append('file',blob);
      xhr.open('POST', '/file//func.click', true);
      xhr.overrideMimeType("multipart/form-data;");
      xhr.send(form);
      alert("Function erased.");
      self.refreshEditor();
    }
  });
}

Click.prototype.confClean = function() {
  console.log("Refresh Editor");
  this.clickEditorBox.confClean();
  this.clickEditorBox.refresh();
}

Click.prototype.refreshEditor = function() {
  console.log("Refresh Editor");
  this.clickEditorBox.refresh();
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
  this.clickLogBox = new Boxes.LogAndUploadBox;
  this.layout = new BoxesLayout([
    this.clickInfoBox, this.clickGraphBox,this.clickEditorBox,this.clickLogBox
  ]);
  this.layout.render();
};

module.exports = Click;