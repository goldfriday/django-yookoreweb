'use strict';

/**
 * @ngdoc directive
 * @name yookoreApp.directive:contentitem
 * @description
 * # contentitem
 */
angular.module('yookoreApp').directive('contentItem', function ($compile,templateService) {
      var getTemplate = function (templates, contentType) {
        var template = '';

        switch (contentType) {
            case 'statusupdate':
                template = templates.statusTemplate;
                break;
            case 'blogpost':
                template = templates.blogpostTemplate;
                break;
        }

        return template;
    };

        var linker = function (scope, element, attrs) {
        templateService.getTemplates().then(function (response) {
            var templates = response.data;
            console.log(templates);
            element.html(getTemplate(templates, scope.content.type));

            $compile(element.contents())(scope);
        });
    };
    
        return {
        restrict: 'E',
        link: linker,
        scope: {
            content: '='
        }
    };
  });
