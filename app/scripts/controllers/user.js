app.controller('UserCtrl', [
	'$scope',
	'$filter',
	'favorites', 
	'videos',
	'User',
	function ($scope, $filter, favorites, videos, User) {

		angular.forEach(favorites, function(i){
			angular.extend(i, $filter('filter')(videos, {id: i.video}, true)[0]);
		})

		$scope.favorites = _.sortBy(favorites, function(i){
			return i.title;
		});

		$scope.favorite = function(video){
			console.log(video)
			User.favorite(video, true).then(function(res){
				// $scope.isFavorite = !$scope.isFavorite;
				var found = _.find(videos, {id: video.id });
				// if(found) found.like = !found.like;

			})
		}



	}]
);

