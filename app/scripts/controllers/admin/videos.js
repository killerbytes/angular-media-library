var xx;
'use strict';

/**
* @ngdoc function
* @name mediaLibraryWebApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the mediaLibraryWebApp
*/
app.controller('AdminVideoCtrl', [
	'$scope',
	'$modal',
	'$routeParams',
	'$document',
	'mdVideo',
	'mdImdb',
	'videos',
	function ($scope, $modal, $routeParams, $document, Video, Imdb, videos) {

		$scope.videos = videos;
		$scope.page = 1;

		if($routeParams.id){
			Video.get($routeParams.id).then(function(res){
				$scope.video = res;
			})
		}

		$scope.$watch('page', function(value, old){
			if(value != old){
				if($scope.isLoading) return false;
				loadMore($scope.page);
			}
		})

		function loadMore(page){
			$scope.isLoading = true;
			Video.list(page).then(function(res){
				$scope.videos = $scope.videos.concat(res);
				$scope.list.data('page', page);
				$scope.isLoading = false;
			})
		}
		$scope.load = function(){
			$scope.list = angular.element('.video-list');
			$scope.page =  $scope.list.data('page') + 1;
		}

		$scope.getImdb = function(id, item){
			Imdb.get(id).then(function(res){
				$scope.item = res;
				item.data = res;
			})
		}

		$scope.selectImdb = function(item, video){
			if(!item.data){
				Imdb.get(item.imdbID).then(function(res){
					angular.extend( video, convertVideo(res) );
					video.status = true;
					updateImdb(video);
				})
			}else{
				angular.extend( video, convertVideo(item.data) );
				video.status = true;
				updateImdb(video)
			}
		}

		function convertVideo(video){
			return {
				title: video.Title,
				year: video.Year,
				imdb: video.imdbID,
				genre: video.Genre,
				actors: video.Actors,
				rating: video.imdbRating,
				poster: video.Poster
			};
		}

		$scope.delete = function(item){
			item.deleted = true;
			updateImdb(item);
		}

		function updateImdb(video){
			delete video.results;
			Video.update(video).then(function(){
				console.log('updated')
			})
		}


		$scope.lookup = function (item, size) {
			var modalInstance = $modal.open({
				templateUrl: 'views/template/lookup.html',
				controller: 'ModalInstanceCtrl',
				size: size || 'sm',
				resolve: {
					items: function () {
						return {
							item: item
						};
					}
				}
			});

			modalInstance.result.then(function (res) {
				item.results = res
			}, function () {

			});
		};


		$document.on('scroll',function(){
			if($document.scrollTop() > angular.element('.video-list').height() - 500){
				$scope.scrolling = true;
				$scope.$apply($scope.load() );
			}
			
		})
	}]);
