'use strict'
// ****** This provides the routing config using the state provider from the angular ui.routet ******//
angular.module('yookoreApp').config(function ($urlRouterProvider, $stateProvider) {

  // Main state routing

  $stateProvider

    .state('main', {
      url: '/',
      templateUrl: '/views/main.html',
      controller: 'RegisterCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/views/register.html',
      controller: 'RegisterCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/views/register.html',
      controller: 'LoginCtrl'
    })

    .state('logout', {
      url: '/',
      controller: 'LogoutCtrl'
    })
    .state('statusupdate', {
      url: '/statusupdate',

      templateUrl: '/views/statusupdate.html',
      controller: 'StatusupdateCtrl'

    })
    .state('blogpost', {
      url: '/blogposts',
      templateUrl: '/views/blogpost.html',
      controller: 'BlogpostCtrl'

    })
    .state('userprofile', {
      url: '/userprofile',
      templateUrl: '/views/userprofile.html',
      controller: 'UserprofileCtrl'

    })
    .state('userprofile_update', {
      url: '/userprofile_update',
      templateUrl: '/views/userprofile_update.html',
      controller: 'UserprofileCtrl'

    })
    .state('activitystream', {
      url: '/activitystream',
      templateUrl: '/views/activitystream.html',
      controller: 'ActivityCtrl'
    })


  // $httpProvider.interceptors.push('authInterceptor');

  // Redirect to home view when route not found
  $urlRouterProvider.otherwise('/');


})

/******************** API CONFIG URL'S *********************************/////
  //  // Localhost API's
  // .constant('LOCAL_API_URL', 'http://localhost:3000')

  // //Authentication Service
  // .constant('AUTH_API_URL', 'http://192.168.10.144:3000')
  //    //Activity Stream
  //.constant('ACTIVITY_API_URL', 'http://192.168.10.15:80')

  //    //BlogPost Service
  // .constant('BLOG_API_URL', 'http://192.168.10.123:8000')
  //     //BlogPost Service
  // .constant('STATUS_LIKE_API_URL', 'http://192.168.10.123:8000')
  // //Status Service
  // .constant('STATUS_API_URL', 'http://192.168.10.123:8000')
  //   //Search Service API
  // .constant('SEARCH_API_URL', 'http://192.168.10.20:9200');

/******************** API CONFIG URL'S *********************************/////
  // Localhost API's
  .constant('LOCAL_API_URL', 'http://localhost:3000')

  //Authentication Service
  .constant('AUTH_API_URL', 'http://41.160.30.173:3002')
  //Activity Stream
  .constant('ACTIVITY_API_URL', 'http://41.160.30.173:3002/stream/')

  //BlogPost Service
  .constant('BLOG_API_URL', 'http://41.160.30.173:3002')
  //BlogPost Service
  .constant('STATUS_LIKE_API_URL', 'http://41.160.30.173:3002')
  //Status Service
  .constant('STATUS_API_URL', 'http://41.160.30.173:3002')
  .constant('AUTH_SESSION_ID', 'JSESSIONID8048DCCE0ED5191FB928C4E55EB8C85A')
  //Search Service API
  .constant('SEARCH_API_URL', 'http://192.168.10.20:9200');
