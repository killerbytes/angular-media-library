'use strict';
app.directive('showPoster', [
   'config',
   'mdImdb',
   'mdUtils',
   '$timeout',
   function (config, Imdb, Utils, $timeout) {
      return {
         restrict: 'A',
         link: function(scope, element, attrs) {
            
         element.on('click', function(e){
         	e.preventDefault();         	
         	showPoster();
         })

         function showPoster(){
	  			Imdb.get(scope.item.imdbID).then(function(res){
  					// var myPopover = $popover(element, {
       //        title: res.Title, 
       //        content: '<img class="img-responsive" src="'+res.Poster+'">', 
       //        autoClose: true, 
       //        html: true});

       //      var img = angular.element('img');
       //      img.load(res.Poster, function(){
       //        console.log('load')
       //      })
	  				// $timeout(function(){
  					// 	myPopover.show();
  					// })

	  			})


         }


         }
      }
   }
]);

