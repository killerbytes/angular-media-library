'use strict';

/**
* @ngdoc function
* @name mediaLibraryWebApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the mediaLibraryWebApp
*/
app.controller('VideosCtrl', [
	'$scope',
	'$modal',
	'$routeParams',
	'mdVideo',
	'mdImdb',
	'mdUtils',
	'videos',
	'genres',
	function ($scope, $modal, $routeParams, Video, Imdb, Utils, videos, genres) {
		$scope.Utils = Utils;
		$scope.videos = videos;
		$scope.genres = genres;
		$scope.id = $routeParams.id;

		if($routeParams.id){
				// Video.get()
			Imdb.get($routeParams.imdb).then(function(res){
				$scope.imdb = res;
			})

			// Video.getByImdb($routeParams.imdg).then(function(res){
			// 	$scope.video = res;
			// })

		}


	}]);
