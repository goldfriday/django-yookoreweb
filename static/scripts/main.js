define(["jquery", "bootstrap", "recordmp3", "mikes-modal", "photo-modal", "resize-textarea", "bootstrap3_player", "jquery.ui.widget", "tmpl", "load-image", "load-image-orientation", "load-image-meta", "load-image-exif", "load-image-exif-map", "canvas-to-blob", "jquery.iframe-transport", "jquery.fileupload", "jquery.fileupload-process", "jquery.fileupload-image", "jquery.fileupload-audio", "jquery.fileupload-video", "jquery.fileupload-validate", "jquery.fileupload-ui", "jquery.message", "main", "caption", "jive", "jive.oo.Class", "rest", "jquery.ba-bbq", "jive.RestService"], function ($, bootstrap, recordmp3, mikesModal, photoModal, resizeTextarea, bootstrapPlayer, uiwidget, tmpl, loadimage, loadimageOrient, loadimageMeta, loadImageExif, loadImageExifMap, canvasToBlob, $IFrameTransport, $Fileupload, $FileuploadProcess, $FileUploadImage, $FileuploadAudio, $FileuploadVideo, $FileuploadValidate, $FileuploadUI, $Message, main, caption, namespace, Class, rest, $deparam, RestService) {

    $(function () {
        console.log('loading main app module');
    });

    // Implementation of search
    var search_text = $('#id-search-text').val();
    console.log(search_text);

    // search for first name for now
    var local_ip = "192.168.10.20:9200";
    var public_ip = "41.160.30.173:3002";
    var uri = "http://" + public_ip + "/info/users/_search?q=firstname:";


    $("#id-search-text").keyup(function (e) {
        var query = $('#id-search-text').val();

        if (query.length >= 3) {
            console.log('searching...');

            $("#search-box").show();

            $.ajax({
                url: uri + query + " ",
                type: 'GET',
                success: function (data, status, xhr) {
                    var $results_panel = $("#search-results");
                    $results_panel.html("");

                    $.each(data.hits.hits, function (idx, person) {
                        $results_panel.append(
                            "<div class='search-user-card'>" +
                            "<a href='/profile/" + person._source.username + "'>" +
                            "<div class='search-user-pix'><img src='static/images/pix.png' width='100%'></div>" +

                            "<div class='search-user-wrapper'>" +
                            "<a href='/profile/" + person._source.username + "' class='search-user-name'>" + person._source.firstname + " " + person._source.lastname + "<span>" + person._source.username + "</span>" +
                            "</a>" +
                            "</div>" +
                            "</a>" +
                            "<div class='clear'></div>" +
                            "</div>"
                        );
                    });

                    $("#search-results-count").html(data.hits.total);
                    $("#view-all-results").prop("href", "/search/" + query + "?size=50&from=0");
                    $("#search-result-count-link").prop("href", "/search/" + query + "?size=50&from=0");
                },
                error: function () {
                    console.log('could not retrieve search results.');
                    $("#search-results").html("<h3>Could not retrieve search results.</h3>");
                }
            });

            $("#view-all-results").attr("href", "/search/" + query + "?size=50&from=0");
            $("#search-result-count-link").attr("href", "/search/" + query + "?size=50&from=0");
        }
    });

    //close panel
    $(document).keyup(function (event) {
        if (event.which === 27) {
            $('#search-box').hide();
            $('#id-search-text').val();
        }
    });

    //listener to close panel when user clicks anywhere on screen
    $(document).mouseup(function () {
        $('#search-box').hide();
        $('#id-search-text').val("");
    });

    //close panel
    $(document).keyup(function (event) {
        if (event.which === 27) {
            $('#search-box').hide();
            $('#id-search-text').val();
        }
    });

    //listener to close panel when user clicks anywhere on screen
    $(document).mouseup(function () {
        $('#search-box').hide();
        $('#id-search-text').val("");
    });

    // Adverts
//  $().ready(function () {
//      var $scrollingDiv = $(".advert-wrapper");
//      $(window).scroll(function () {
//
//          if ($(window).scrollTop() > 320) { // Start scrolling after this distance from the top – adjust it for what you need (trial and error or a ruler on the screen graduated in pixels ;) )
//              $scrollingDiv
//                      .stop()
//                      .animate({"marginTop": ($(window).scrollTop() - 30) + "px"}, "slow");	 // How many pixels to add to the distance
//          }
//          if ($(window).scrollTop() <= 320) { // Less than this distance = RESET to original margin – set to 0 here but you can reset to your own original margin – this stops the element raising up too high up the page
//              $scrollingDiv
//                      .stop()
//                      .animate({"marginTop": "0px"}, "slower");
//          }
//          var mql = window.matchMedia("screen and (max-width: 1139px)")
//          if (mql.matches) { // if media query matches
//              $scrollingDiv
//                      .stop()
//                      .animate({"marginTop": "0px"}, "fast");
//          }
//      });
//  });
//  
//  $(function () {
//      $('[data-toggle="popover"]').popover()
//  })

    // Scripts in footer
    $(function () {
        $('#myTab a:first').tab('show')
    })
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').focus()
    });

    $(document).ready(function () {
        $('.thumbnail').hover(function () {
            $(this).find('.caption').slideDown(250); //.fadeIn(250)
        }, function () {
            $(this).find('.caption').slideUp(250); //.fadeOut(205)
        });
    });
});
