'use strict';

/**
 * @ngdoc service
 * @name yookoreApp.usersessionidCookie
 * @description
 * # usersessionidCookie
 * Factory in the yookoreApp.
 */
angular.module('yookoreApp')
  .factory('usersessionidCookie', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
