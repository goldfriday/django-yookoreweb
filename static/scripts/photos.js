/**
 * An AMD module.
 * Photos model
 */
define(function (require) {
  require('../js/lib/rest_service')
  
  console.log('loaded photos module');
  
  var PHOTOS_BASE_URL = 'http://41.160.30.173:3002/';
  var $fileuploadWidget = $('#photo.fileupload')
  
    // Initialize the jQuery File Upload widget:
  //var files = $.makeArray(fileInput.prop('files'))
  if($fileuploadWidget) {
    $fileuploadWidget.fileupload({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        url: PHOTOS_BASE_URL + "api/photos/photoalbum/e1c5d682-c7ec-11e4-9a71-685b35b7fe48/photos/",
        dataType: 'json',
        // Extra form data
        //formData: postData,
        submit: function(e, data) {
          console.log(data)
          data.formData = {
            author: "ptchankue",
            object_id: "e1c5d682-c7ec-11e4-9a71-685b35b7fe48",
            images: data.files[0].name
          }
        },
        done: function(e, data) {
          // reset
          $('div.files').empty()
          $('.status-update-wrapper').find('#photo textarea').val("")
        },
        progressall: function(e, data) {
          $('#photo.fileupload').addClass('fileupload-processing');
        },
        always: function(e, data) {
          console.log('upload request completed')
        },
        fail: function(e, data) {
          console.log('File upload failed', e)
        }
    });
  }
   
  this.PhotoService = jive.RestService.extend(function(protect, _super) {
    console.log('uploading ')
    protect.service_base_url = PHOTOS_BASE_URL;
    protect.pluralizedResourceType = "api";

    this.init = function(options) {
      _super.init.call(this, options);
      this.RESOURCE_ENDPOINT = PHOTOS_BASE_URL + this.resourceType + "/photos/photo/post/e1c5d682-c7ec-11e4-9a71-685b35b7fe48/"
      this.suppressGenericErrorMessages();

      this.POST_RESOURCE_ENDPOINT = this.RESOURCE_ENDPOINT;
    };

    this.saveUrl = function(resource) {
      var url = _super.saveUrl.call(this, resource);
      var fromQuest = $.deparam.querystring().fromQ;
      if (fromQuest) {
        var queryParams = "?fromQuest=" + fromQuest;
        return url + queryParams;
      } else {
        return url;
      }
    };
  });

  // Create a photo object
  this.create = function() {
  
  };

  this.hide = function(elements) {
    for(element in elements) {
      $.find(element).fadeOut('slow')
    }
  };
  
  // get files
  this.getFiles = function() {
    var files = $('.files')
    return null
  }
  
  return {
    "instance": new this.PhotoService(),
    "files": this.getFiles()
  }
});

//jive.namespace('photos')
//
//console.log(jive.photos)
//
//jive.photos.Photos = function() {
//  console.log('calling jive.photos namespace')
//}


