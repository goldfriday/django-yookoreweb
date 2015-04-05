
define(["jquery", "bootstrap", "recordmp3", "mikes-modal", "photo-modal", "resize-textarea", "bootstrap3_player", "jquery.ui.widget", "tmpl", "load-image", "load-image-orientation", "load-image-meta", "load-image-exif", "load-image-exif-map", "canvas-to-blob", "jquery.blueimp-gallery", "jquery.iframe-transport", "jquery.fileupload", "jquery.fileupload-process", "jquery.fileupload-image", "jquery.fileupload-audio", "jquery.fileupload-video", "jquery.fileupload-validate", "jquery.fileupload-ui", "main"], function($, bootstrap, recordmp3, mikesModal, photoModal, resizeTextarea, bootstrapPlayer, uiwidget, tmpl, loadimage, loadimageOrient, loadimageMeta, loadImageExif, loadImageExifMap, canvasToBlob, $Gallery, $IFrameTransport, $Fileupload, $FileuploadProcess, $FileUploadImage, $FileuploadAudio, $FileuploadVideo, $FileuploadValidate, $FileuploadUI, main) {
  /*define(function(require) {
      var mod = require("./relative/name");
  });*/
  $(function() {
    console.log('loading main app module');
  });

  // Search Implementation
  var search_text = $('#id-search-text').val();
  console.log(search_text);
  /*$('#id-search-text').keypress(function (e) {
      e.preventDefault();
  if (e.which == 13) {
      $('form#id-search-text').submit();
          
      }
  });

  $(function (){
    $('#id-search-text').change(function (){
      console.log($('#id-search-text').val());

    });       
  });*/

  // search for first name for now
  var uri = "http://192.168.10.20:9200/info/users/_search?q=firstname:";
/*
  $("#id-search-text").keypress(function(e){
      var query = $('#id-search-text').val();

      if (e.which == 13) {
          console.log('The text changed ' + $('#id-search-text').val());
            $.ajax({
              url: "/search/"+ query,
              type: 'GET',
              success: function (result) {
                  console.log(result); 
                  
              }
          });  
      }
  });
*/

  /*$("#id-search-text").keypress(function(e){
      var query = $('#id-search-text').val();
      //console.log('The text typed ' + uri+ query);

      if (query.length > 5) {
          $.ajax({
              url: uri + query,
              type: 'GET',
              success: function (result) {
                  console.log(result);
                  
              }
          });  

      }
      

      if (e.which == 13) {
          console.log('The text changed ' + $('#id-search-text').val());
            $.ajax({
              url: uri + query,
              type: 'GET',
              success: function (result) {
                  console.log(result); 
                  console.log('Hits object: ')
                  console.log(result['hits']['hits']);
                  var hits = result['hits']['hits'];
                  for (i=0; i < hits.length; i++ ) {
                      var person = hits[i]['_source'];
                      console.log(person['username'], person['firstname'], person['lastname']);
                      

                  }
                  
              }
          });  
      }
  });
*/
  $("#id-search-text").keypress(function(e){
      var query = $('#id-search-text').val();
      uri = 'search/' + query;
      //console.log('The text typed ' + uri+ query);

      if (query.length >= 3) {
          console.log('search-->');
          $.ajax({
              url: uri ,
              type: 'GET',
              success: function (data, status, xhr) {
                  console.log('Search from keypress called');
                  console.log(data);
                  //window.location = uri;
                  
              },
              error: function () {
                  console.log('Ajax error occurred');
              }
          });  

      }
  });
  // works
  $("#id-search-text").change(function(){
      var query = $('#id-search-text').val();
      uri = 'search/' + query;
      //uri = 'test';
      console.log('The text changed ** ' + query);
        $.ajax({
              //url: 'search/'+ query,
              url: uri,
              type: 'GET',
              success: function (result) {
                  console.log('Search method from change called...');
                    window.location = uri;
                  
              },
              error: function() {
                  console.log('An error occurred');
              }
          });  

  });

  // Adverts
  $().ready(function () {
      var $scrollingDiv = $(".advert-wrapper");
      $(window).scroll(function () {

          if ($(window).scrollTop() > 320) { // Start scrolling after this distance from the top – adjust it for what you need (trial and error or a ruler on the screen graduated in pixels ;) )
              $scrollingDiv
                      .stop()
                      .animate({"marginTop": ($(window).scrollTop() - 30) + "px"}, "slow");	 // How many pixels to add to the distance
          }
          if ($(window).scrollTop() <= 320) { // Less than this distance = RESET to original margin – set to 0 here but you can reset to your own original margin – this stops the element raising up too high up the page
              $scrollingDiv
                      .stop()
                      .animate({"marginTop": "0px"}, "slower");
          }
          var mql = window.matchMedia("screen and (max-width: 1139px)")
          if (mql.matches) { // if media query matches
              $scrollingDiv
                      .stop()
                      .animate({"marginTop": "0px"}, "fast");
          }
      });
  });
  
  $(function () {
      $('[data-toggle="popover"]').popover()
  })

  // Scripts in footer
  $(function () {
      $('#myTab a:first').tab('show')
  })
  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').focus()
  });
});
