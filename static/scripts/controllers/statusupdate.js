'use strict';
angular.module('yookoreApp').controller('StatusupdateCtrl',['$scope', 'statusUpdates', 'STATUS_LIKE_API_URL','$state','fullNameStore','userNameStore', function ($scope,statusUpdates, STATUS_LIKE_API_URL, $state, fullNameStore, userNameStore) {
    
        var author = userNameStore.getuserName();
        console.log(author);
    
     $scope.statusupdates = statusUpdates.query();
    // Return all status update for the user
    // console.log(statusupdate);
     // $scope.statusupdate= [];
    $scope.submit = function() {

       $scope.author = author;
       $scope.location  = 'Randburg';

      // if(!$scope.newstatusUpdate || $scope.newstatusUpdate.length < 1) return;
      var statusupdate = new statusUpdates({
        body: $scope.body,
        author: $scope.author,
        location: $scope.location
      
      });
      statusupdate.$save(function(){
        // $scope.statusupdates = [];
        $scope.statusupdates.push(statusupdate);
        //$scope.statusupdates = statusUpdates.query();
        $scope.statusupdate = new statusUpdates();
        $state.reload();

        
      });

    }




    //    $scope.submit = function() {

      
    //     // var $scope.author = "Paul Imisi";
    //     //  var location = "Randburg";
    //        $scope.author = 'ptchankue';
    //        $scope.location  = 'Randburg';

    //     var statusupdate = {
    //         body: $scope.body,
    //         author: $scope.author,
    //         location: $scope.location

    //     };

    //   $http.post(STATUS_API_URL + '/api/status_updates/post/ptchankue/',statusupdate)
    //  .success(function  (res) {
    //    alert('success', 'Status updated !');

    //  })
    //  .error(function  (err) {
    //    alert('warning', 'Opp!', 'Status not updated');
    //  })
    // };
    //   $http.get(STATUS_API_URL + '/api/status_updates/post/ptchankue/').success(function(statusupdate){
    //  $scope.statusupdate = statusupdate;

    // }).error(function(err){
    //  alert('warning',"Unable to get status", err.message);
    // })

        


}]);

