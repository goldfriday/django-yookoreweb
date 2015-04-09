// Load the main app module to start the app
require(['./common'], function (common) {
  // load view based on url path
  console.log(location)
      require(["../scripts/stream_view"]);
//  switch(location.pathname) {
//    case "/activity":
//      require(["../scripts/stream_view"]);
//      break;
//    case "/search":
//      require(["../scripts/search_view"])
//      break;
//    default:
//      //require('../scripts/not_found_view')
//      break;
//  }
});
