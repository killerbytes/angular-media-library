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
	'$window',
	'$location',
	'mdVideo',
	'mdUtils',
	'mdImdb',
	'videos',
	function ($scope, $modal, $routeParams, $document, $window, $location, Video, Utils, Imdb, videos) {
		$scope.Utils = Utils;
		$scope.videos = videos;
		$scope.page = 1;
		var currentPage = null;

		var attachments = null;

		if($routeParams.id){
			Video.get($routeParams.id).then(function(res){
				$scope.video = res;
				attachments = res.attachments;
			})
		}

		// $scope.page = $location.path().split('/admin/videos/')[1];

		$scope.$watch('page', function(value, old){
			if(value != old || !value ){
				if($scope.isLoading) return false;
				loadMore($scope.page);
			}
		})

		function loadMore(page){
			if(!page) return false;
			if(page == currentPage) return false;
			$scope.isLoading = true;
			Video.raw({status:false, deleted: false, page: page}).then(function(res){
				$scope.videos = $scope.videos.concat(res);
				currentPage = page;
				$scope.list.data('page', page);
				$scope.isLoading = false;
			})
		}
		function autoLoad(){
			if(angular.element('.video-list').height() <= $window.innerHeight + 1000){
				$scope.load();
				loadMore($scope.page)
			}			
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

		$scope.downloadPosters = function(){
			_.forEach($scope.videos, function(i){
				if(!i.attachments_file_name){
					i.attachments = i.poster;
					updateImdb(i)
				}				
			})
		}

		$scope.selectImdb = function(item, video){
			removeFromList(video)
			Imdb.get(item.imdbID).then(function(res){
				angular.extend( video, convertVideo(res) );
				video.status = true;
				if(item.Poster !== video.attachments) video.attachments = item.Poster;
				updateImdb(video);
			})
		}

		$scope.formatFileSize =function(size){
		    var sizes = [' Bytes', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB'];
		    for (var i = 1; i < sizes.length; i++)
		    {
		        if (size < Math.pow(1024, i)) return (Math.round((size/Math.pow(1024, i-1))*100)/100) + sizes[i-1];
		    }
		    return size;
		}
		function convertVideo(video){
			return {
				title: video.Title,
				year: video.Year,
				imdb: video.imdbID,
				genre: video.Genre,
				actors: video.Actors,
				rating: video.imdbRating,
				attachments: video.Poster,
				poster: video.Poster,
				// photo: video.Poster
			};
		}

		$scope.delete = function(item){
			removeFromList(item);
			Video.delete(item).then(function(){
			})
		}
		$scope.inactive = function(item){
			delete item.attachments;
			item.status = false;
			item.deleted = true;
			removeFromList(item);
			Video.update(item).then(function(){
			})
		}

		function removeFromList(item){
			$scope.videos.splice($scope.videos.indexOf(item), 1)
			autoLoad();
		}

		$scope.saveVideo = function(video){
			updateImdb(video)
		}

		function updateImdb(video){
			if(video.poster == "N/A") video.poster = "posters/placeholder.jpg";
			if(video.attachments == "N/A") video.attachments = null;

			Video.update(video).then(function(){})
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
