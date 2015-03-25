'use strict';
angular.module('yookoreApp').controller('ActivityCtrl',[ '$scope', 'Activities','$stateParams', 'ACTIVITY_API_URL', '$http', 'userNameStore', function ($scope, Activities, $stateParams, ACTIVITY_API_URL, $http, userNameStore) {


  $scope.showType = function(activity){
    return activity.object.hasOwnproperty('type')
  };

  var userName = 'miketyson';



  function load(page) {
    var params = {page: page},
      isTerminal = $scope.pagination  &&
        $scope.pagination.current_page>= $scope.pagination.total_pages &&
        $scope.pagination.current_page <=1;

    if (!isTerminal) {
      $scope.loading = true;
      // $http.get(ACTIVITY_API_URL + userNameStore.getuserName() + '/activities/flat' )
      $http.get(ACTIVITY_API_URL + userNameStore.getuserName() + '/activities' ).success(function(data, status, headers){
        $scope.pagination = angular.fromJson(headers('x-pagination'));
        $scope.activities = $scope.activities || [];
        $scope.objects=[];
        $scope.activities.push.apply($scope.activities, data.list);
        console.log(data.list);
        // $rootScope.objectid = data.list;
        // angular.forEach(value, function(activity){
        //          $scope.activities.push(activity);
        //          $scope.objects.push(activity.id);
        //          };




        console.log(data.list[0].object.id);



      }).error(function(error){
        console.log("error could not fetch content");
      })

        .finally(function() {
          // Flag loading as complete
          $scope.loading = false;
        });

    }
  }

  // Register event handler
  $scope.$on('endlessScroll:next', function() {
    // Determine which page to load
    var page = $scope.pagination ? $scope.pagination.current_page + 1 : 1;

    // Load page
    load(page);
  });

  // Load initial page (first page or from query param)
  load($stateParams.page ? parseInt($stateParams.page, 10) : 1);

}]);

