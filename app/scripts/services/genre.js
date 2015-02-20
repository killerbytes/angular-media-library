'use strict';
app.factory('mdGenre', function ($q, $http, config) {
	var $injector = angular.injector(['ng']);

	var Model = function(data){
		angular.extend(this, data);
	};

	Model.list = function(){
		var d = $q.defer();

		$http.get('/data/genres.json')
		.success(function (res) {
			d.resolve(res);
		});
		return d.promise;			
	}



	return Model;


});
