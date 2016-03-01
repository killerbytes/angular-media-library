'use strict';

/**
* @ngdoc function
* @name mediaLibraryWebApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the mediaLibraryWebApp
*/
app.controller('SearchCtrl', [
	'$scope',
	'$modal',
	'$routeParams',
	'mdVideo',
	'mdGenre',
	function ($scope, $modal, $routeParams, Video, Genre) {
		$scope.inProgress = true;

		if(!_.isEmpty($routeParams)){
			Video.list().then(function(res){
				$scope.videos = res;
				$scope.inProgress = false;
			})

			Genre.list().then(function(res){
				$scope.genres = res;
			})
		}

		$scope.query = {
			title: $routeParams.title || '',
			actors: $routeParams.actors || '',
			year: $routeParams.year || '',
			genre: $routeParams.genre || ''
		}

		$scope.search = function (item, size) {
			var modalInstance = $modal.open({
				templateUrl: 'views/template/search.html',
				controller: 'ModalInstanceCtrl',
				size: size || 'sm',
				resolve: {
					items: function () {
						return {
							genres: $scope.genres
						};
					}
				}
			});

			modalInstance.result.then(function (res) {
			}, function () {

			});
		};


	}]);
