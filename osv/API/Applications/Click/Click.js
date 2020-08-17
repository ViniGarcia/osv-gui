var apiGETCall = require("../../../helpers").apiGETCall,
  apiPOSTCall = require("../../../helpers").apiPOSTCall,
  GraphAPI = require("../../GraphAPI");

module.exports = { 
  version: apiGETCall("/click_plugin/version"),
  running: apiGETCall("/click_plugin/running"),
  start: apiPOSTCall("/click_plugin/start"),
  stop: apiPOSTCall("/click_plugin/stop"),
  readFile: apiGETCall("/click_plugin/read_file"),
  writeFile: apiPOSTCall("/click_plugin/write_file"),
  metrics: apiGETCall("/click_plugin/metrics"),
  vnfIdentification: apiGETCall("/click_plugin/vnf_identification"),
  log: apiGETCall("/click_plugin/log")
};
