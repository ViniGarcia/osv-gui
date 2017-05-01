var Settings = require("../Settings"),
    BaseBox = require("./BaseBox"),
    OS = require("../API/OS"),
    Click = require("../API/Applications/Click/Click"),
    helpers = require("../helpers");

//Set refresh
function ClickInfoBox() {
  this.interval = setInterval(this.refresh.bind(this), Settings.DataFetchingRate)
}

//Proto
ClickInfoBox.prototype = Object.create(BaseBox.prototype);

ClickInfoBox.prototype.template = "/osv/templates/boxes/StaticBoxClick.html";

//Refresh function (sem alterar)
ClickInfoBox.prototype.refresh = function () {
  var container = $(this.selector);
  this.fetchData().then(function (data) {
    data.forEach(function (obj) {
      //console.log(obj);
      container.find("[data-key='"+obj.key+"']").html(obj.value);
    })
  });
};

ClickInfoBox.prototype.clear = function() {
  clearInterval(this.interval);
  $(this.selector).remove();
};

ClickInfoBox.prototype.vmShutdown = function() {
  OS.shutdown(1);
};

ClickInfoBox.prototype.vmReboot = function() {
  OS.reboot(1);
};

ClickInfoBox.prototype.nfStart = function() {
  Click.start(1);
};

ClickInfoBox.prototype.nfStop = function() {
  Click.stop(1);
}

ClickInfoBox.prototype.getData = function() {
  return $.when(
    Click.vnfIdentification(),
    Click.running()
  );
};

ClickInfoBox.prototype.formatUptime = function(ms) {
  var x, seconds, minutes, hours, days, uptime = "";
  x = ms / 1000;
  seconds = Math.floor(x % 60);
  x /= 60;
  minutes = Math.floor(x % 60);
  x /= 60;
  hours = Math.floor(x % 24);
  x /= 24;
  days = Math.floor(x);

  uptime +=  days + " Days, ";
  uptime +=  hours + " Hours, ";
  uptime +=  minutes + " Minutes, ";
  uptime +=  seconds + " Seconds. ";
  
  return uptime;

};

ClickInfoBox.prototype.parseNFstatus = function(status) {
    if (status == true) {
      return "Running";
    }
    if(status == false){
      return "Not Running";
    }
  return "Error";
};

ClickInfoBox.prototype.parseData = function(vnfID, nfStatus) {
  return [
    { key: "Name", value: vnfID.name },
    { key: "Provider", value: vnfID.provider },
    { key: "Description", value: vnfID.description },
    { key: "Version", value: vnfID.version },
    { key: "NF Status", value: this.parseNFstatus(nfStatus) }
  ];
};

ClickInfoBox.prototype.fetchData = function() {
  return this.getData().then(this.parseData.bind(this));
};

module.exports = ClickInfoBox;
