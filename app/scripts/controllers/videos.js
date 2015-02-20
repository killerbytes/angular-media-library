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
	'$sce',
	'mdVideo',
	'mdImdb',
	'mdUtils',
	'videos',
	'genres',
	function ($scope, $modal, $routeParams, $sce, Video, Imdb, Utils, videos, genres) {
		$scope.Utils = Utils;
		$scope.$sce = $sce;
		$scope.videos = videos;
		$scope.genres = genres;
		$scope.id = $routeParams.id;

		if($routeParams.id){
			Video.get($routeParams.id).then(function(res){
				$scope.video = res;
			})
			Imdb.get($routeParams.imdb).then(function(res){
				$scope.imdb = res;
				// console.log(res.Poster, Utils.getBase64FromImageUrl(res.Poster))
				
			})

			// Video.getByImdb($routeParams.imdg).then(function(res){
			// 	$scope.video = res;
			// })

		}


	}]);
