'use strict';

/**
 * @ngdoc directive
 * @name yookoreApp.directive:ngIf
 * @description
 * # ngIf
 */
angular.module('yookoreApp')
  .directive('ngIf', function() {
    return {
        link: function(scope, element, attrs) {
            if(scope.$eval(attrs.ngIf)) {
                // remove '<div ng-if...></div>'
                element.replaceWith(element.children())
            } else {
                element.replaceWith(' ')
            }
        }
    }
  });

