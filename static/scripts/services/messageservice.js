'use strict';

/**
 * @ngdoc service
 * @name yookoreApp.messageService
 * @description
 * # messageService
 * Factory in the yookoreApp.
 */
angular.module('yookoreApp').factory('messageService', function ($rootScope) {

  var updateactivitystream = {
    messages:[],
    identity:0,
    addMessage: function(text, caller){
      this.identity +=;
      var id = this.identity,
      message ={
        text:caller  + ":" + text,
        id:id
      };
      this message.push(message)
    }
  }

  });
