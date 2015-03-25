'use strict';

/**
 * @ngdoc function
 * @name yookoreApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yookoreApp
 */
angular.module('yookoreApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
