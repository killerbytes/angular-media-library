	'use strict';

/**
* @ngdoc function
* @name mediaLibraryWebApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the mediaLibraryWebApp
*/
app.controller('LatestCtrl', [
	'$scope',
	'$rootScope',
	'$modal',
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
	function ($scope, $rootScope, $modal, $routeParams, $window, $filter, $sce, Video, Imdb, Utils, videos, favorites, User) {
		$scope.Utils = Utils;
		$scope.$sce = $sce;
		$scope.id = $routeParams.id;

		var videos =_.sortBy(videos, function(i){
			return moment(i.created_at);
		}).reverse();

		_.forEach(favorites, function(i){
			var found = _.find(videos, {id: i.video});
			if(found) found.like = true;
			
		})

		$scope.videos = _.take(videos, 100);

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


	

	}]);
