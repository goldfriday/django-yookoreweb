define(['jquery'], function($) {
  console.log('loaded comment module');
  //$('#id-comment-{{activity.object.id}}').click(function() { 
  $('#id-comment-').click(function() { 
      console.log('comment to be posted ');
      body_text = $('textarea#comment-body').val();

      var payload = {
          author: '{{ username }}',
          object_id: '{{ activity.object.id }}',
          body: body_text
      } 

      $.ajax({
          url: 'http://192.168.10.123:8000/api/content/{{ activity.object.id }}/comments/',
          type: 'POST',
          data: payload,
          success: function (result) {
              console.log("Your comment has been posted");
              $('textarea#comment-body').val('');

              window.location.reload(true);
          }
      });  

  });

});
