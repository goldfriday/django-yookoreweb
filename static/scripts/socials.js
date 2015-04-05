define(['jquery'], function ($) {
  console.log('loaded socials module')
  // handling the liking here
  //$('#like-click-{{activity.object.id}}').click(function() { 
  $('#like-click-').click(function() { 
    console.log('Like button clicked');
    var payload = {
          author: '{{ username }}',
          object_id: '{{ activity.object.id }}'
      } 

      $.ajax({
          url: 'http://192.168.10.123:8000/api/content/{{activity.object.id}}/likes/',
          type: 'POST',
          data: payload,
          success: function (result) {
            alert("Your like has been saved");
            window.location.reload(true);
          }
      });  

  });

});
