// <script>
// (function($)
// {
//     $(document).ready(function()
//     {
//         $.ajaxSetup(
//         {
//             cache: false,
//             beforeSend: function() {
//                 $('.photo-in-status-update-auto').hide();
//                 $('#loading').show();
//             },
//             complete: function() {
//                 $('#loading').hide();
//                 $('.photo-in-status-update-auto').show();
//             },
//             success: function() {
//                 $('#loading').hide();
//                 $('.photo-in-status-update-auto').show();
//             }
//         });
//         var $container = $(".photo-in-status-update-auto");
//         $container.load("latest-pix.php");
//         var refreshId = setInterval(function()
//         {
//             $container.load('latest-pix.php');
//         }, 300000);
//     });
// })(jQuery);
// </script>
	
$().ready(function() {
var $scrollingDiv = $(".advert-wrapper");
$(window).scroll(function(){

if($(window).scrollTop() > 320 ){ // Start scrolling after this distance from the top – adjust it for what you need (trial and error or a ruler on the screen graduated in pixels ;) )
$scrollingDiv
.stop()
.animate({"marginTop": ($(window).scrollTop() - 30) + "px"}, "slow" );	 // How many pixels to add to the distance
}
if($(window).scrollTop() <= 320 ){ // Less than this distance = RESET to original margin – set to 0 here but you can reset to your own original margin – this stops the element raising up too high up the page
$scrollingDiv
.stop()
.animate({"marginTop": "0px"}, "slow" );
}
var mql = window.matchMedia("screen and (max-width: 1139px)")
if (mql.matches){ // if media query matches
 $scrollingDiv
.stop()
.animate({"marginTop": "0px"}, "fast" );
}
});
});