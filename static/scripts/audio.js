define(function(require) {

  function __log(e, data) {
    log.innerHTML = "\n" + e + " " + (data || '');
  }

  var audio_context;
  var recorder;
  var input;

  function startUserMedia(stream) {
    input = audio_context.createMediaStreamSource(stream);
    //__log('Media stream created.' );
    //__log("input sample rate " +input.context.sampleRate);

    input.connect(audio_context.destination);
    //__log('Input connected to audio context destination.');

    recorder = new Recorder(input);
    console.log("recorder initialized");
    __log('Recorder initialised.');
  }

  function startRecording(button) {
    if(recorder == undefined) {
      console.log("recorder is undefined | initializing ")
      init();
      console.log(recorder);
    }

    console.log(".. started recording")
    console.log(recorder);

    recorder && recorder.record();
    button.disabled = true;
    button.nextElementSibling.disabled = false;
    __log('Recording...');
  }

  function stopRecording(button) {
    recorder && recorder.stop();
    button.disabled = true;
    button.previousElementSibling.disabled = false;
    __log('Stopped recording.');

    console.log("..stopped recording");

    // create WAV download link using audio data blob
    createDownloadLink();

    if (recorder !== undefined)
      recorder.clear();
  }

  function createDownloadLink() {
    console.log("..creating recording.");
    recorder && recorder.exportWAV(function(blob) {
      console.log("-- we're creating the recording");

      var url = URL.createObjectURL(blob);
      var li = document.createElement('li');
      var au = document.createElement('audio');
      var hf = document.createElement('a');

      au.controls = true;
      au.src = url;
      hf.href = url;
      hf.download = new Date().toISOString() + '.wav';
      hf.innerHTML = hf.download;
      li.appendChild(au);
      li.appendChild(hf);
      document.getElementById("recordingList").appendChild(li);
    });
  }

  function init() {
    try {
      // webkit shim
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = ( navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);
      window.URL = window.URL || window.webkitURL;

      audio_context = new AudioContext;
      console.log('Audio context set up.');
      console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
    } catch (e) {
      alert('No web audio support found in this browser! You will not be able to use the audio blog feature.');
    }

    navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
      console.log('No live audio input: ' + e);
    });
  };

//  window.onload = function init() {
//    try {
//      // webkit shim
//      window.AudioContext = window.AudioContext || window.webkitAudioContext;
//      navigator.getUserMedia = ( navigator.getUserMedia ||
//      navigator.webkitGetUserMedia ||
//      navigator.mozGetUserMedia ||
//      navigator.msGetUserMedia);
//      window.URL = window.URL || window.webkitURL;
//
//      audio_context = new AudioContext;
//      console.log('Audio context set up.');
//      console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
//    } catch (e) {
//      alert('No web audio support found in this browser! You will not be able to use the audio blog feature.');
//    }
//
//
//    navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
//      console.log('No live audio input: ' + e);
//    });
//  };

  /**
  * upload an audio-blog
  */
  $('#post-audio').click(function() {
      console.log('uploading audio file...');

      var fd = new FormData();
      var username = $(".audio-post-body").data("username");
      var caption = $('textarea#audio-caption').val();

      fd.append('caption', caption);
      fd.append('username', username);
      fd.append('file',  $('#audioFileUpload')[0].files[0] );

      $.ajax({
          url: 'http://41.160.30.173:3002/audio/web',
          type: 'POST',
          data: fd,
          processData: false,
          contentType: false,
          success: function (result) {
            console.log("upload successful: " + result);
            alert("Audio file uploaded successfully!");
            window.location.reload(true);
          },
          error: function (result) {
              console.log("An error occurred while uploading the Audio file.");
              alert("An error occurred while uploading the Audio file.");
          }
      });
  });

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
})
