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
	'$document',
	'$sce',
	'mdVideo',
	'mdImdb',
	'mdUtils',
	'videos',
	'genres',
	function ($scope, $modal, $routeParams, $document, $sce, Video, Imdb, Utils, videos, genres) {
		$scope.Utils = Utils;
		$scope.$sce = $sce;
		$scope.videos = videos;
		$scope.genres = genres;
		$scope.id = $routeParams.id;

		$scope.isNew = function(date){
			return moment().diff(date, "days") < 30 ;
		}

		$scope.TOC = [];
		_.forEach(videos, function(video){
			
			if($scope.TOC.indexOf(video.title.charAt(0).toUpperCase()) === -1){
				$scope.TOC.push(video.title.charAt(0))
			}
		})

		if($routeParams.id){
			Video.get($routeParams.id).then(function(res){
				$scope.video = res;
			})
			Imdb.get($routeParams.imdb).then(function(res){
				$scope.imdb = res;			
			})
		}


		
		$scope.scrollTo = function(anchor){
		   var el = angular.element("[data-title^=" + anchor + "]")
			$document.scrollToElement(el, 60, 500);	
		}



	}]);
