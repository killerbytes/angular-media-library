'use strict';

/**
 * @ngdoc overview
 * @name mediaLibraryWebApp
 * @description
 * # mediaLibraryWebApp
 *
 * Main module of the application.
 */
var app = angular
  .module('mediaLibraryWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .constant('config', {
    imgBase: '/',
    apiBase: 'http://localhost:3000',
    // apiBase: '/data',
    imdbBase: '//www.omdbapi.com'
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/videos', {
        templateUrl: 'views/videos/index.html',
        controller: 'VideosCtrl',
        resolve: {
          videos: ['mdVideo', function(d){ return d.list(1,1000,true) }],
          genres: ['mdGenre', function(d){ return d.list() }]
        }
      })
      .when('/videos/:id/edit', {
        templateUrl: 'views/videos/edit.html',
        controller: 'AdminVideoCtrl',
        resolve: {
          videos: ['mdVideo', function(d){ return [] }],
          genres: ['mdGenre', function(d){ return d.list() }]
        }
      })
      .when('/videos/:id/:imdb', {
        templateUrl: 'views/videos/show.html',
        controller: 'VideosCtrl',
        resolve: {
          videos: ['mdVideo', function(d){ return [] }],
          genres: ['mdGenre', function(d){ return d.list() }]
        }
      })
      .when('/search/:type/:query', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        resolve: {
          videos: ['mdVideo', function(d){ return d.list(1, 999999, true) }]
        }
      })
      .when('/admin/videos/', {
        templateUrl: 'views/admin/videos/index.html',
        controller: 'AdminVideoCtrl',
        resolve: {
          videos: ['mdVideo', function(d){ return d.list(1,999999,true) }]
        }
      })
      .when('/admin/videos/raw', {
        templateUrl: 'views/admin/videos/raw.html',
        controller: 'AdminVideoCtrl',
        resolve: {
          videos: ['mdVideo', function(d){ return d.list(1,100,false) }]
        }
      })
      .otherwise({
        redirectTo: '/videos'
      });
  })

.run([
  '$rootScope',
  'config', 
  function($rootScope, config){
    $rootScope.config = config
}])
