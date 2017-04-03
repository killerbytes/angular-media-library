'use strict';
app.factory('mdVideo', function ($q, $http, $filter, $localStorage, $routeParams, config) {
	var $injector = angular.injector(['ng']);
	var videos = null;

	var env = config[config['env']];

	var Model = function(data){
		angular.extend(this, data);
	};

	Model.list = function(status){
		status = status || true;
		var d = $q.defer();
		if(env.env == "production"){
			if(!videos){
					$http.get(config['production'].apiBase + '/videos.json', {
						cache: false,
						params: {
							status: status,
							deleted: false
						}
					})
					.then(function (res) {
						videos = res.data;
						$localStorage.videos = videos;
						d.resolve(videos);
					});

				// }else{
				// 	videos = $localStorage.videos;
				// 	d.resolve(videos);
				// }
			}else{
				d.resolve(videos);
			}
		}else{
			$http.get(env.apiBase + '/videos.json', {
				cache: false,
				params: {
					status: status
				}
			})
			.success(function (res) {
				d.resolve(res);
			});
		}
		return d.promise;
	}

	Model.deleted = function(){
		var d = $q.defer();
		$http.get(env.apiBase + '/videos/deleted.json', {
			cache: false,
			params: {
				deleted: true,
				status: false
			}
		})
		.success(function (res) {
			d.resolve(res);
		});
		return d.promise;
	}

	Model.raw = function(params){
		var d = $q.defer();
		console.log('raw')
		$http.get(env.apiBase + '/videos.json', {
			cache: false,
			params: params
		})
		.success(function (res) {
			d.resolve(res);
		});
		return d.promise;
	}

	Model.get = function(id){
		var d = $q.defer();
		if(env.env == 'production'){
			if(!videos){
				Model.list().then(function(res){
					videos = res;
					d.resolve(_.find(res, {id: parseInt(id) }));
				})
			}else{
				d.resolve(_.find(videos, {id: parseInt(id) }));
			}

		}else{
			$http.get(env.apiBase + '/videos/'+ id + '.json', {}, {
				headers: {
		        'Accept': undefined
				}

			})
			.then(function (res) {
				d.resolve(res);
			});

		}
		return d.promise;
	}

	Model.update = function(item){
		var d = $q.defer();
		$http.put(env.apiBase + '/videos/'+ item.id + '.json', {"video": item})
		.success(function (res) {
			// $filter('filter')(videos, function(i){
			// 	if(i.id == item.id){
			// 		angular.extend(i, item)
			// 	}
			// });
			// console.log(videos)
			d.resolve(res);
		});
		return d.promise;
	}

	Model.delete = function(item){
		var d = $q.defer();
		$http.delete(env.apiBase + '/videos/'+ item.id)
		.success(function (res) {
			d.resolve(res);
		});
		return d.promise;
	}


	return Model;


});
