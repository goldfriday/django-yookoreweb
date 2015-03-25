'use strict';


angular.module('yookoreApp').controller('StatusupdateCtrl', function ($scope, statusUpdate) {
   //  $scope.submit = function() {

      
   //      // var $scope.authorid = "Paul Imisi";
   //       var location = "Randburg";
        
   //      var statusupdate = {
   //          content: $scope.content,
   //          authorid: $scope.authorid,
   //          location: $scope.location

   //      };

   //    $http.post(API_URL_2 + '/statusupdate/',statusupdate)
   //  	.success(function  (res) {
   //  		alert('success', 'Status updated !');

   //  	})
   //  	.error(function  (err) {
   //  		alert('warning', 'Opp!', 'Status not updated');
   //  	})
   //  };
   //    $http.get(API_URL_2 + '/statusupdate/').success(function(statusupdate){
  	// 	$scope.statusupdate = statusupdate;

  	// }).error(function(err){
  	// 	alert('warning',"Unable to get status", err.message);
  	// })




    $scope.statusupdate = statusUpdate.query();
    $scope.submit = function() {
      if(!scope.newstatusUpdate || $scope.newstatusUpdate.length <1) return;
      var statusupdate = new statusUpdate({
        author: $scope.author,
        content_type: $scope.content_type,
        view_count: $scope.view_count,
        like_count: $scope.like_count,
        comment_count:$scope.comment_count,
        location: $scope.location,
        body: $scope.body
      });
      status.$save()
    }

});

