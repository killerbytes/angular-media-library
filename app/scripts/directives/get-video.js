'use strict';
app.directive('getVideo', [
   'config',
   'mdImdb',
   'mdUtils',
   function (config, Imdb, Utils) {
      return {
         restrict: 'A',
         link: function(scope, element, attrs) {
            
            var filename = Utils.parseFilename(scope.video.filename);

            Imdb.search(filename).then(function(res){
               scope.video.results = res.Search;
            })


         }
      }
   }
]);
