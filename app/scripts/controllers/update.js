'use strict';

/**
 * @ngdoc function
 * @name mediaLibraryWebApp.controller:UpdateCtrl
 * @description
 * # UpdateCtrl
 * Controller of the mediaLibraryWebApp
 */
angular.module('mediaLibraryWebApp')
  .controller('UpdateCtrl', function ($scope, $localStorage, mdVideo, mdGenre, mdUtils) {
  	$scope.Utils = mdUtils;
  });
