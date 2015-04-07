// Load the main app module to start the app
require(['./common'], function (common) {
  //require(["../scripts/main"]);
  // load view based on url path
  require(["../scripts/stream_view"]);
});
/*define(['./common'], function(require) {
    require("../scripts/main");
});*/
