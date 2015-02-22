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
        if(search.imdb){
          Imdb.get(search.query).then(function(res){
             $modalInstance.close([{
              "Title": res.Title,
              "Year": res.Year,
              "imdbID": res.imdbID,
              "Type": "movie"
            }]);
          })
        }else{
          Imdb.search(search.query).then(function(res){
             $modalInstance.close(res.Search);
          })

        }
      }



  }]);
