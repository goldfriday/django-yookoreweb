'use strict';

/**
 * @ngdoc service
 * @name yookoreApp.templateService
 * @description
 * # templateService
 * Factory in the yookoreApp.
 */
angular.module('yookoreApp').factory('templateService', function ($http) {
    var getTemplates = function () {
        return $http.get('views/templates/templates.json');

    };

    return {
        getTemplates: getTemplates
           
    };
 
  });
