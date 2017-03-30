var apiGETCall = require("../../../helpers").apiGETCall,
  apiPOSTCall = require("../../../helpers").apiPOSTCall;

module.exports = { 
  version: apiGETCall("/click_plugin/version"),
  running: apiGETCall("/click_plugin/running"),
  start: apiPOSTCall("/click_plugin/start"),
  stop: apiPOSTCall("/click_plugin/stop"),
  edit_config: apiPOSTCall("/click_plugin/edit_config")
};
