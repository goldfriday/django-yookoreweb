'use strict';
/* This factory service saves the Username to local Storage**/

angular.module('yookoreApp').factory('userNameStore', function($window) {
    var storage = $window.localStorage;
    var cachedUserName;
    var userName = 'username';
    var isUsernameStored = false;
    var userNameStore = {
        setuserName: function(username) {
            cachedUserName = username;
            console.log(cachedUserName + " I am stored in Cache");
            storage.setItem(userName, username)
            isUsernameStored = true;
        },
        getuserName: function() {
            cachedUserName = storage.getItem(userName);
            // if (!cachedUserName)
            //     cachedUserName = storage.getItem(userName);
            return cachedUserName;

        },
        isUsernameStored: function() {
            return !!userNameStore.getuserName();
        },
        removeuserName: function(){
            cachedUserName = null;
            
            storage.removeItem(userName);
            isUsernameStored =false
            console.log(cachedUserName + "Still here");
            console.log(userName + "Still here");
        }


    }
    return userNameStore;
/********************* Using Local API Start*********************/
    // var storage = $window.localStorage;
    // var cachedUsername;
    // var username = 'userName';
    // var isUsernameStored = false;
    // var userNameStore = {
    //     setuserName: function(username) {
    //         cachedUsername = username;
    //         storage.setItem(username, username)
    //         isUsernameStored = true;
    //     },
    //     getuserName: function() {
    //         if (!cachedUsername)
    //             cachedUsername = storage.getItem(username);
    //         return cachedUsername;

    //     },
    //     isUsernameStored: function() {
    //         return !! userNameStore.getuserName();
    //     },
    //     removeuserName: function(){
    //         cachedUsername = null;
    //         storage.removeItem(username);
    //         isUsernameStored =false
    //     }


    // }
    // return userNameStore;

    
/********************* Using Local API End*********************/
});
