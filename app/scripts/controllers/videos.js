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
	'$rootScope',
	'$routeParams',
	'$window',
	'$filter',
	'$sce',
	'mdVideo',
	'mdImdb',
	'mdUtils',
	'videos',
	'favorites',
	'User',
	function ($scope, $rootScope, $routeParams, $window, $filter, $sce, Video, Imdb, Utils, videos, favorites, User) {

		$scope.Utils = Utils;
		$scope.$sce = $sce;
		$scope.id = $routeParams.id;
		_.forEach(favorites, function(i){
			var found = _.find(videos, {id: i.video});
			if(found) found.like = true;

		})
		$scope.isNew = function(date){
			return moment().diff(date, "days") < 30 ;
		}

		$scope.favorite = function(video){
			User.favorite(video, video.like).then(function(res){
				$scope.isFavorite = !$scope.isFavorite;
				var found = _.find(videos, {id: video.id });
				if(found) found.like = !found.like;

			})
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
			User.isFavorite($routeParams.id).then(function(res){
				if(res.$value === null){
					$scope.isFavorite = false;
				}else{
					$scope.isFavorite = true;
				}
			});
		}

		$scope.videos = $filter('filter')(videos, function (item) {
            if (item.title.charAt(0).toLowerCase() == $routeParams.char.toLowerCase()) {
                return item
            }
    	})


	}]);
