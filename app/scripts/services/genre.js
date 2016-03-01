'use strict';
app.factory('mdGenre', function ($q, $http, config, $localStorage) {
	var $injector = angular.injector(['ng']);
	var genres = [
"Action",
"Comedy",
"Drama",
"Adventure",
"Crime"
];
	config = config[config['env']];

	var Model = function(data){
		angular.extend(this, data);
	};

	Model.list = function(){
		var d = $q.defer();
		d.resolve(genres)
		// if(config.env == "production"){
		// 	if(!genres){
		// 		console.log($localStorage.genres)
		// 		if($localStorage.genres){
		// 			genres = $localStorage.genres;
		// 			d.resolve(genres);
		// 		}else{
		// 			$http.get(config.apiBase + '/genres.json')
		// 			.success(function (res) {
		// 				$localStorage.genres = res;
		// 				genres = res;
		// 				d.resolve(res);
		// 			});		
		// 		}
		// 	}else{
		// 		d.resolve(genres);
		// 	}
		// }else{
		// 	$http.get('/data/genres.json')
		// 	.success(function (res) {
		// 		d.resolve(res);
		// 	});		
		// }

		return d.promise;			
	}



	return Model;


});
