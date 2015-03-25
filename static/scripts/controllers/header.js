'use strict';

angular.module('yookoreApp').controller('HeaderCtrl', function ($scope,$aside, userNameStore, fullNameStore, sessionId) {
    $scope.isAuthenticated = sessionId.isAuthenticated;
    var username = userNameStore.getuserName(username);
    var fullname = fullNameStore.getfullName(fullname);
     console.log(username + 'Just logged in');
     console.log(fullname + 'Just logged in');

     $scope.username = username;
     $scope.fullname = fullname;

      var asideInstance = $scope.openAside = function openAside(position) {
      $aside.open({
        placement: position,
        templateUrl: '/views/aside.html',
        size: 'lg'
      });
    };
  });
