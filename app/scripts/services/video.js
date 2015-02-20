'use strict';
app.factory('mdVideo', function ($q, $http, config) {
	var $injector = angular.injector(['ng']);

	var Model = function(data){
		angular.extend(this, data);
	};

	Model.list = function(page, per_page, status){
		var d = $q.defer();
		var page = page || 1
			, per_page = per_page || 10
			, status = status || false;

		$http.get(config.apiBase + '/videos.json', {
			cache: false,
			params: {
				page: page,
				per_page: per_page,
				status: status
			}
		})
		.success(function (res) {
			d.resolve(res);
		});
		return d.promise;			
	}

	Model.get = function(id){
		var d = $q.defer();
		$http.get(config.apiBase + '/videos/'+ id + '.json', {}, {
			headers: {
	        'Accept': undefined
			}

		})
		.success(function (res) {
			d.resolve(res);
		});
		return d.promise;			
	}

	Model.update = function(item){
		var d = $q.defer();
		$http.put(config.apiBase + '/videos/'+ item.id + '.json', {"video": item})
		.success(function (res) {
			d.resolve(res);
		});
		return d.promise;			
	}


	return Model;


});
