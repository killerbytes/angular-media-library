'use strict';

app.controller('ModalInstanceCtrl', [
  	'$scope',
  	'$modalInstance',
  	'mdImdb',
    'mdUtils',
    'items',
  	function ($scope, $modalInstance, Imdb, Utils, items) {
   
      $scope.search = {
        query: Utils.parseFilename(items.item.filename)
      }
      $scope.lookup = function(search){
	  		
	  		Imdb.search(search.query).then(function(res){
			     $modalInstance.close(res.Search);
	  		})

      }



  }]);
