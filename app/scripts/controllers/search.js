var xx;
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
	'videos',
	function ($scope, $modal, $routeParams, Video, videos) {
		$scope.videos = videos;
		$scope.search = {};
		$scope.search[$routeParams.type] = $routeParams.query


		$scope.getType = function(obj){
			return Object.keys($scope.search);
		}
	}]);
