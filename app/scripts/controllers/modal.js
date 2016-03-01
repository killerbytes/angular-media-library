'use strict';

app.controller('ModalInstanceCtrl', [
    '$scope',
    '$modalInstance',
    '$location',
    'mdImdb',
    'mdUtils',
    'items',
    function ($scope, $modalInstance, $location, Imdb, Utils, items) {
        $scope.genres = items.genres;

    $scope.submitSearch = function(form){
        var search = {
            title: form.title || '',
            actors: form.actors || '',
            genre: form.genre || ''
        }
        $modalInstance.close();
        $location.path('/search/').search(search);
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
