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
	'ngResource',
	'ngRoute',
	'ngSanitize',
	'ngTouch',
	'duScroll',
	'ui.bootstrap',
	'ngStorage',
	'firebase'
	])
.constant('config', {
	// env: 'development',
	env: 'production',
	development: {
		imgBase: '/',
		apiBase: 'http://localhost:3000',
		imdbBase: 'http://omdbapi.com',
		env: 'development'
	},
	production: {
		imgBase: '/',
		apiBase: '/data',
		imdbBase: 'http://omdbapi.com',
		env: 'production'
	}
})
.config(['$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('');
}])
.config(function ($routeProvider, $locationProvider) {
	$routeProvider
	.when('/latest', {
		templateUrl: 'views/latest.html',
		controller: 'LatestCtrl',
		resolve: {
			favorites: ['User', function(d){ return d.favorites() }],
			videos: ['mdVideo', function(d){ return d.list() }]
		}
	})
	.when('/favorites', {
		templateUrl: 'views/favorites.html',
		controller: 'UserCtrl',
		resolve: {
			favorites: ['User', function(d){ return d.favorites() }],
			videos: ['mdVideo', function(d){ return d.list() }]
		}
	})
	.when('/videos/:char', {
		templateUrl: 'views/videos/index.html',
		controller: 'VideosCtrl',
		resolve: {
			favorites: ['User', function(d){ return d.favorites() }],
			videos: ['mdVideo', function(d){ return d.list() }],
		}
	})
	.when('/admin/videos/:id/edit', {
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
			favorites: ['User', function(d){ return d.favorites() }],
			videos: ['mdVideo', function(d){ return [] }],
			// genres: ['mdGenre', function(d){ return d.list() }]
		}
	})
	.when('/search', {
		templateUrl: 'views/search.html',
		controller: 'SearchCtrl'
	})
	.when('/update', {
		templateUrl: 'views/update.html',
		controller: 'UpdateCtrl'
	})
	.when('/admin/videos/', {
		templateUrl: 'views/admin/videos/index.html',
		controller: 'AdminVideoCtrl',
		resolve: {
			videos: ['mdVideo', function(d){ return d.list(false) }]
		}
	})
	.when('/admin/videos/inactive', {
		templateUrl: 'views/admin/videos/list.html',
		controller: 'AdminVideoCtrl',
		resolve: {
			videos: ['mdVideo', function(d){ return d.list(false) }]
		}
	})
	.when('/admin/videos/deleted', {
		templateUrl: 'views/admin/videos/list.html',
		controller: 'AdminVideoCtrl',
		resolve: {
			videos: ['mdVideo', function(d){ return d.deleted(false) }]
		}
	})
	.when('/admin/videos/raw', {
		templateUrl: 'views/admin/videos/raw.html',
		controller: 'AdminVideoCtrl',
		resolve: {
			videos: ['mdVideo', function(d){ return d.raw({status: false, deleted: false, page: 1}) }]
		}
	})
	.otherwise({
		redirectTo: '/latest'
	});
})
.config(['$httpProvider', function ($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
    $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
    $httpProvider.defaults.useXDomain = true;
}])
.run(
	function($rootScope, $timeout, config, $route){
		$rootScope.config = config;
		if(config.env == 'development'){
			$rootScope.isAdmin = true;
		}
	}
)
