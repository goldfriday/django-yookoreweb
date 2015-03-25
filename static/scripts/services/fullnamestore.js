'use strict';

/**
 * @ngdoc service
 * @name yookoreApp.fullnamestore
 * @description
 * # fullnamestore
 * Factory in the yookoreApp.
 */
angular.module('yookoreApp').factory('fullNameStore', function($window) {

  var storage = $window.localStorage;
  var cachedFullName;
  var fullName = "fullname";
  var  isFullnameStored = false;

var fullNameStore = {
      setfullName:function(fullname){
        cachedFullName = fullname;
        storage.setItem(fullName, fullname);
        isFullnameStored = true;
        
      },
      getfullName: function(){
        if (!cachedFullName)
          cachedFullName = storage.getItem(fullName)
        return cachedFullName;
      },
      isFullnameStored: function(){
        return !!fullNameStore.getfullName();
      },
      removefullName: function(){
        cachedFullName = null;
        storage.removeItem(fullName);
        isFullnameStored = false;

      }


  
    }

    return fullNameStore;


  });
