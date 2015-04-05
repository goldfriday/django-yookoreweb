define(['jquery'], function ($) {
  console.log('loaded statusupdate module')

  $('#post-update-button').click(function() { 
      console.log('Status update clicked');
      body_text = $('textarea#body-id').val();

      var payload = {
          author: '{{ username }}',
          body: body_text,
          object_id: '{{ activity.object.id }}'
      } 

      $.ajax({
          url: 'http://192.168.10.123:8000/api/status_updates/post/{{username}}/',
          type: 'POST',
          data: payload,
          success: function (result) {
              console.log('Status update created :)');

            window.location.reload(true);
          }
      });  

  });

  $('#create-blogpost').click(function() { 
      console.log('Blogpost posting clicked');
      body_text = $('#id-blogpost-body').val();
      title_text = $('#id-blogpost-title').val();

      console.log(title_text);

      var payload = {
          author: '{{ username }}',
          title: title_text,
          body: body_text,
          object_id: '{{ activity.object.id }}'
      } 
      console.log(payload);
      $.ajax({
          url: 'http://192.168.10.123:8000/api/blogposts/post/{{username}}/',
        type: 'POST',
        data: payload,
        success: function (result) {
            console.log('Blogpost created :)');
            window.location.reload(true);
        }
      });  

  });

});
