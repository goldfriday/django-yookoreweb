'use strict';

requirejs.config({
  "baseUrl": "/static/scripts",
  // shim non-AMD JS modules
  shim: {
    "bootstrap" : { "deps" :['jquery'] },
    "mikes-modal": { "deps": ['jquery'] },
    "photo-modal": { "deps": ['jquery'] },
    "main": { "deps": ['jquery'] },
    "resize-textarea": { "deps": ['jquery'] },
    "bootstrap3_player": { "deps": ['jquery'] }
  },
  "paths": {
    "app": "../js",
    //"app": "/static/js",
    //"jquery": "//code.jquery.com/jquery-2.1.3.min",
    "jquery": "../js/jquery-2.1.3.min",
    //"bootstrap": "//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min",
    "bootstrap": "../js/bootstrap.min",
    "recordmp3": "../js/recordmp3",
    "mikes-modal": "../js/mikes-modal.min",
    "photo-modal": "../js/photo-modal",
    "jquery.ui.widget": "../js/vendor/jquery.ui.widget",
    //"tmpl": "//blueimp.github.io/JavaScript-Templates/js/tmpl.min",
    "tmpl": "../js/tmpl.min",
    //"load-image": "//blueimp.github.io/JavaScript-Load-Image/js/load-image",
    "load-image": "../js/load-image",
    //"load-image-ios": "//blueimp.github.io/JavaScript-Load-Image/js/load-image-ios",
    "load-image-ios": "../js/load-image-ios",
    //"load-image-orientation": "//blueimp.github.io/JavaScript-Load-Image/js/load-image-orientation",
    "load-image-orientation": "../js/load-image-orientation",
    //"load-image-meta": "//blueimp.github.io/JavaScript-Load-Image/js/load-image-meta",
    "load-image-meta": "../js/load-image-meta",
    //"load-image-exif": "//blueimp.github.io/JavaScript-Load-Image/js/load-image-exif",
    "load-image-exif": "../js/load-image-exif",
    //"load-image-exif-map": "//blueimp.github.io/JavaScript-Load-Image/js/load-image-exif-map",
    "load-image-exif-map": "../js/load-image-exif-map",
    //"canvas-to-blob": "//blueimp.github.io/JavaScript-Canvas-to-Blob/js/canvas-to-blob.min",
    "canvas-to-blob": "../js/canvas-to-blob.min",
    //"blueimp-helper": "//blueimp.github.io/Gallery/js/blueimp-helper",
    "blueimp-helper": "../js/blueimp-helper",
    //"blueimp-gallery": "//blueimp.github.io/Gallery/js/blueimp-gallery.min",
    "blueimp-gallery": "../js/blueimp-gallery.min",
    //"blueimp-gallery-video": "//blueimp.github.io/Gallery/js/blueimp-gallery-video",
    "blueimp-gallery-video": "../js/blueimp-gallery-video",
    //"jquery.blueimp-gallery": "//blueimp.github.io/Gallery/js/jquery.blueimp-gallery.min",
    "jquery.blueimp-gallery": "../js/jquery.blueimp-gallery.min",
    "jquery.iframe-transport": "../js/jquery.iframe-transport",
    "jquery.fileupload": "../js/jquery.fileupload",
    "jquery.fileupload-process": "../js/jquery.fileupload-process",
    "jquery.fileupload-image": "../js/jquery.fileupload-image",
    "jquery.fileupload-audio": "../js/jquery.fileupload-audio",
    "jquery.fileupload-video": "../js/jquery.fileupload-video",
    "jquery.fileupload-validate": "../js/jquery.fileupload-validate",
    "jquery.fileupload-ui": "../js/jquery.fileupload-ui",
    "main": "../js/main",
    "resize-textarea": "../js/resize-textarea",
    "bootstrap3_player": "../js/bootstrap3_player"
  }
});