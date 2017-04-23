var Click = require("./Click"),
  ClickGraph = require("./ClickGraph"),
  Settings = require("../../../Settings"),
  apiGETCall = require("../../../helpers").apiGETCall;

function ClickMetrics() {
  var self = this;
  self.startPulling();
};

ClickMetrics.prototype = Object.create(ClickGraph.prototype);

ClickMetrics.prototype.cpu = [];

ClickMetrics.prototype.disk = [];

ClickMetrics.prototype.memory = [];

ClickMetrics.prototype.netTx = [];

ClickMetrics.prototype.netRx = [];

ClickMetrics.prototype.pullData = function () {
  var self = this;
  $.when(
    Click.metrics()
  ).then(function (metric) {
    //console.log(metric);
    self.cpu.push([metric.time_ms, metric.list[0].value])
    self.disk.push([metric.time_ms, metric.list[1].value])
    self.memory.push([metric.time_ms, metric.list[2].value])
    self.netTx.push([metric.time_ms, metric.list[3].value])
    self.netRx.push([metric.time_ms, metric.list[4].value])
  })
};

ClickMetrics.prototype.getData = function() {
  return [
    this.safePlot(this.cpu),
    this.safePlot(this.disk),
    this.safePlot(this.memory),
    this.safePlot(this.netTx),
    this.safePlot(this.netRx)
  ]
};

ClickMetrics.prototype.startPulling = function () {
  this.interval = setInterval(this.pullData.bind(this), Settings.DataFetchingRate);
};

var singleton = new ClickMetrics();


module.exports = singleton;
