'use strict';
app.factory('mdImdb', function ($q, $http, config) {
	config = config[config['env']];

	var Model = function(data){
		angular.extend(this, data);
	};

	Model.list = function(page){
		var d = $q.defer();
		var page = page || 1;
		$http.get(config.apiBase + '/videos.json?page=' + page )
		.success(function (res) {
			d.resolve(res);
		});
		return d.promise;
	}

	Model.get = function(imdbId){
		var d = $q.defer();
		$http.get(config.imdbBase + '?i=' + imdbId )
		.then(function (res) {
			d.resolve(res);
		});
		return d.promise;
	}


	Model.search = function(key){
		var d = $q.defer();
		var page = page || 1;
		$http.get(config.imdbBase + '?s=' + key )
		.success(function (res) {
			d.resolve(res);
		});
		return d.promise;
	}


	return Model;


});
