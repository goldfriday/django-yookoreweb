define(['jquery'], function ($) {
  console.log('loaded statusupdate module')

  // Monitoring status update photo

  var status_update_photo;

  var control = document.getElementById("status-photo-file");
  control.addEventListener("change", function(event) {

      // When the control has changed, there are new files

      var i = 0,
          files = control.files,
          len = files.length;

      status_update_photo = files;

      for (; i < len; i++) {
          console.log("Filename: " + files[i].name);
          console.log("Type: " + files[i].type);
          console.log("Size: " + files[i].size + " bytes");
      }

  }, false);

  // Monitoring blog photo

  $('#post-update-button').click(function() { 
      console.log('Status update clicked');
      body_text = $('textarea#body-id').val();
      var fd = new FormData(); 

      fd.append('body', body_text);
      fd.append('author', '{{ username }}');
      
      if (status_update_photo!= null && status_update_photo.length > 0) {
          console.log('Uploading status update with photo ' + status_update_photo[0].name);
          _url = 'http://192.168.10.123:8000/api/status_updates/post_with_photo/{{username}}/';
          fd.append('images', status_update_photo[0]);

      } else {
          _url = 'http://192.168.10.123:8000/api/status_updates/post/{{username}}/';
          
      }

      $.ajax({
          url: _url,
          type: 'POST',
          data: fd,
          cache: false,
          contentType: false,
          processData: false,
          
          success: function (result) {
              console.log('Status update created :)');

              window.location.reload(true);
          }
      });  

  });


  // Monitoring blog photo

  var blogpost_photo;

  var control = document.getElementById("blogpost-photo-file");
  control.addEventListener("change", function(event) {

      var i = 0,
          files = control.files,
          len = files.length;

      blogpost_photo = files;

      for (; i < len; i++) {
          console.log("Filename: " + files[i].name);
          console.log("Type: " + files[i].type);
          console.log("Size: " + files[i].size + " bytes");
      }

  }, false);


  $('#create-blogpost').click(function() { 
      console.log('Blogpost posting clicked');
      body_text = $('#id-blogpost-body').val();
      title_text = $('#id-blogpost-title').val();

      var fd = new FormData(); 

      fd.append('title', title_text);
      fd.append('body', body_text);
      fd.append('author', '{{ username }}');
      
      if (blogpost_photo!= null && blogpost_photo.length > 0) {
          console.log('Uploading status update with photo ' + blogpost_photo[0].name);
          _url = 'http://192.168.10.123:8000/api/blogposts/post_with_photo/{{username}}/';
          fd.append('images', blogpost_photo[0]);

      } else {
          _url = 'http://192.168.10.123:8000/api/blogposts/post/{{username}}/';
          
      }

      $.ajax({
          url: _url,
          type: 'POST',
          data: fd,
          cache: false,
          contentType: false,
          processData: false,
          
          success: function (result) {
              console.log('Blogpost created :)');
              window.location.reload(true);
          }
      });  

  });

  $('#id-upload-photo').click (function() {
      console.log($('#id-upload-photo').val());
      console.log('Abstraction the upload button '); console.log($('#fileUpload'));
      // Check if a status was typed

      $.ajax({
          url:'',
          type:'POST',
          data:'',
          success: function (result) {

          }
      });
  });

});
