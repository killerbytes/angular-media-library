var xx;
'use strict';

/**
 * @ngdoc directive
 * @name mediaLibraryWebApp.directive:videoViews
 * @description
 * # videoViews
 */
angular.module('mediaLibraryWebApp')
  .directive('videoViews', function () {
    return {
      templateUrl: 'views/directives/videos.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      		scope.isNew = function(date){
	      		return moment().diff(date, "days") < 60 ;
      		}

      }
    };
  });
