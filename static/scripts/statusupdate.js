define(function (require) {
  console.log('loaded statusupdate module')

  require('./audio')

  // Monitoring status update photo

  // Start posting a statusupdate
  var list_of_photo;

  var inputElement = document.getElementById("statusupdate-photo-file");
  if(inputElement) {
    inputElement.addEventListener("change", handleStatusFiles, false);
  }
  function handleStatusFiles() {
      console.log('Handling file for status');
      var fileList = this.files; /* now you can work with the file list */
      var i = 0,
          files = this.files,
          len = files.length;

      list_of_photo = files;

      for (; i < len; i++) {
          console.log("Filename: " + files[i].name);
          console.log("Type: " + files[i].type);
          console.log("Size: " + files[i].size + " bytes");
      }

    console.log(list_of_photo);
  }

  $('#post-update-button').click(function() { 
      console.log('Status update clicked');
      body_text = $('textarea#body-id').val();
      var fd = new FormData(); 
      var username = $('.status-update-form-wrapper').data('username')

      fd.append('body', body_text);
      fd.append('author', username)

      console.log(list_of_photo);
      
      if (list_of_photo!= null && list_of_photo.length > 0) {
          console.log('Uploading status update with photo ' + list_of_photo[0].name);
          _url = 'http://192.168.10.123:8000/api/status_updates/post_with_photo/' + username + '/';
          fd.append('images', list_of_photo[0]);

      } else {
          _url = 'http://192.168.10.123:8000/api/status_updates/post/' + username + '/';
          
      }

      $('#loading').html('<img src="static/images/loading.gif"> loading...');

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

              $('#loading').hide();
          }
      });  

  });

  // Start posting a blogpost

  var blogpost_photo;
  // Monitoring blog photo
  var inputElement = document.getElementById("blogpost-photo-file");
  if(inputElement) {
    inputElement.addEventListener("change", handleFiles, false);
  }
  function handleFiles() {
      console.log('handle blogpost photo');

      var fileList = this.files; /* now you can work with the file list */
      var i = 0,
          files = this.files,
          len = files.length;

      blogpost_photo = files;

      for (; i < len; i++) {
          console.log("Filename: " + files[i].name);
          console.log("Type: " + files[i].type);
          console.log("Size: " + files[i].size + " bytes");
      }

    console.log(fileList);
  }

  $('#create-blogpost').click(function() { 
      console.log('Blogpost posting clicked');
      body_text = $('#id-blogpost-body').val();
      title_text = $('#id-blogpost-title').val();

      var fd = new FormData(); 
      var username = $('.status-update-form-wrapper').data('username')

      fd.append('title', title_text);
      fd.append('body', body_text);
      fd.append('author', username);
      
      if (blogpost_photo!= null && blogpost_photo.length > 0) {
          console.log('Uploading blogpost with photo ' + blogpost_photo[0].name);
          _url = 'http://192.168.10.123:8000/api/blogposts/post_with_photo/' + username + '/';
          fd.append('images', blogpost_photo[0]);

      } else {
          console.log('Posting status update without photo');
          _url = 'http://192.168.10.123:8000/api/blogposts/post/' + username + '/';
          
      }
      $('#loading-blogpost').html('<img src="static/images/loading.gif"> loading...');

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
               $('#loading-blogpost').hide();
          }
      });  

  });
  });
