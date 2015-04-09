/**
 * The main stream module.
 * Controller for socials, statusupdate, photos, comment
 */
define(function (require) {

  console.log('calling stream.js');
  require('./socials')
  require('./statusupdate')
  var photos = require('./photos')
  require('./comment')

  console.dir(photos);
  //console.log(jive.photos.Photos())

  var func = function() {
    console.log('calling stream.js');
  }
  return func;
});
