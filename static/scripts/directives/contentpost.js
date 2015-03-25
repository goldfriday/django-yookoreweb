'use strict';

// Angular directive for the activity stream
angular.module('yookoreApp').directive('contentPost', ['$compile', '$http', '$templateCache', function($compile, $http, $templateCache) {

    var getTemplate = function(contentType) {
        var templateLoader,
            baseUrl = 'views/templates/components/stream_post_types/',
            // Map content type to respective html page
            templateMap = {
                statusupdate: 'statusupdate.html',
                blogpost: 'blogpost.html'


            };

        // Set the base template URL and put in a variable

        var templateUrl = baseUrl + templateMap[contentType];


        // Retrieve the template using Angular $Http Service

        templateLoader = $http.get(templateUrl, {
            cache: $templateCache
        });
        return templateLoader;
        console.log("templateLoader");

    }

    var linker = function(scope, element, attrs) {
        var loader = getTemplate(scope.content.type);
        var promise = loader.success(function(html) {
            element.html(html);
        }).then(function(response) {
            element.replaceWith($compile(element.html())(scope));
        });

    }
    return {
        restrict: 'E',
    
        scope: {
            content: '='
        },
        link: linker

    };



}]);

