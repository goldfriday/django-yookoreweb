'use strict';

/**
 * @ngdoc service
 * @name yookoreApp.templatecache
 * @description
 * # templatecache
 * Service in the yookoreApp.
 */
angular.module("templates",[]).run('templatecache', function ($templateCache) {

	$templateCache.put('statusupdateId.html','I am a status update');
    
  });
