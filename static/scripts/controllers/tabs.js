'use strict';
angular.module('yookoreApp').controller('TabsCtrl', function ($scope, $window, $rootScope, $state) {

    $scope.go = function (route) {
        $state.go(route);
    };

    $scope.active = function (route) {
        return $state.is(route);
    };





 

    $scope.tabs = [
        { heading: "Status", route: "activitystream.status", active: true } ,
        { heading: "Photos", route: "activitystream.photos", active: false, background: 'url(images/icons/blog-white.png)' },
        { heading: "Blogs", route:  "activitystream.blogs", active: false, background: 'url(images/icons/blog-white.png)'  },
        { heading: "Audio", route:  "activitystream.audio", active: false, background: 'url(images/icons/blog-white.png)'  }
    ];



    $scope.$on("$stateChangeSuccess", function () {
        $scope.tabs.forEach(function (tab) {
            tab.active = $scope.active(tab.route);
        });
    });

  });
