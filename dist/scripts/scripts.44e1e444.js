"use strict";var app=angular.module("mediaLibraryWebApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap"]).constant("config",{apiBase:"/data",imdbBase:"http://www.omdbapi.com"}).config(["$routeProvider",function(a){a.when("/videos",{templateUrl:"views/videos/index.html",controller:"VideosCtrl",resolve:{videos:["mdVideo",function(a){return a.list(1,1e3,!0)}],genres:["mdGenre",function(a){return a.list()}]}}).when("/videos/:id/:imdb",{templateUrl:"views/videos/show.html",controller:"VideosCtrl",resolve:{videos:["mdVideo",function(){return[]}],genres:["mdGenre",function(a){return a.list()}]}}).when("/videos/:id/edit",{templateUrl:"views/videos/edit.html",controller:"AdminVideoCtrl",resolve:{videos:["mdVideo",function(){return[]}],genres:["mdGenre",function(a){return a.list()}]}}).when("/search/:type/:query",{templateUrl:"views/search.html",controller:"SearchCtrl",resolve:{videos:["mdVideo",function(a){return a.list(1,999999,!0)}]}}).when("/admin/videos",{templateUrl:"views/admin/videos.html",controller:"AdminVideoCtrl",resolve:{videos:["mdVideo",function(a){return a.list(1,100,!1)}]}}).otherwise({redirectTo:"/videos"})}]),xx;app.controller("AdminVideoCtrl",["$scope","$modal","$routeParams","$document","mdVideo","mdImdb","videos",function(a,b,c,d,e,f,g){function h(b){a.isLoading=!0,e.list(b).then(function(c){a.videos=a.videos.concat(c),a.list.data("page",b),a.isLoading=!1})}function i(a){return{title:a.Title,year:a.Year,imdb:a.imdbID,genre:a.Genre,actors:a.Actors,rating:a.imdbRating,poster:a.Poster}}function j(a){delete a.results,e.update(a).then(function(){console.log("updated")})}a.videos=g,a.page=1,c.id&&e.get(c.id).then(function(b){a.video=b}),a.$watch("page",function(b,c){if(b!=c){if(a.isLoading)return!1;h(a.page)}}),a.load=function(){a.list=angular.element(".video-list"),a.page=a.list.data("page")+1},a.getImdb=function(b,c){f.get(b).then(function(b){a.item=b,c.data=b})},a.selectImdb=function(a,b){a.data?(angular.extend(b,i(a.data)),b.status=!0,j(b)):f.get(a.imdbID).then(function(a){angular.extend(b,i(a)),b.status=!0,j(b)})},a["delete"]=function(a){a.deleted=!0,j(a)},a.lookup=function(a,c){var d=b.open({templateUrl:"views/template/lookup.html",controller:"ModalInstanceCtrl",size:c||"sm",resolve:{items:function(){return{item:a}}}});d.result.then(function(b){a.results=b},function(){})},d.on("scroll",function(){d.scrollTop()>angular.element(".video-list").height()-500&&(a.scrolling=!0,a.$apply(a.load()))})}]),app.controller("VideosCtrl",["$scope","$modal","$routeParams","mdVideo","mdImdb","mdUtils","videos","genres",function(a,b,c,d,e,f,g,h){a.Utils=f,a.videos=g,a.genres=h,a.id=c.id,c.id&&e.get(c.imdb).then(function(b){a.imdb=b})}]);var xx;app.controller("SearchCtrl",["$scope","$modal","$routeParams","mdVideo","videos",function(a,b,c,d,e){a.videos=e,a.search={},a.search[c.type]=c.query,a.getType=function(){return Object.keys(a.search)}}]),app.controller("ModalInstanceCtrl",["$scope","$modalInstance","mdImdb","mdUtils","items",function(a,b,c,d,e){a.search={query:d.parseFilename(e.item.filename)},a.lookup=function(a){c.search(a.query).then(function(a){b.close(a.Search)})}}]),app.directive("getVideo",["config","mdImdb","mdUtils",function(a,b,c){return{restrict:"A",link:function(a){var d=c.parseFilename(a.video.filename);b.search(d).then(function(b){a.video.results=b.Search})}}}]),app.directive("showPoster",["config","mdImdb","mdUtils","$timeout",function(a,b){return{restrict:"A",link:function(a,c){function d(){b.get(a.item.imdbID).then(function(){})}c.on("click",function(a){a.preventDefault(),d()})}}}]),app.factory("mdUtils",["$q","$http","config",function(){var a=function(a){angular.extend(this,a)};return a.parseFilename=function(a){var b=[/\.mkv/g,/\.avi/g,/\.mp4/g,/\./g],c=a;return _.forEach(b,function(a){c=c.replace(a," ")}),c.split(" ").slice(0,2).join(" ")},a.humanFileSizezx=function(a,b){var c=b?1e3:1024;if(c>a)return a+" B";var d=b?["kB","MB","GB","TB","PB","EB","ZB","YB"]:["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],e=-1;do a/=c,++e;while(a>=c);return a.toFixed(1)+" "+d[e]},a.humanFileSize=function(a){var b=Math.floor(Math.log(a)/Math.log(1024));return 1*(a/Math.pow(1024,b)).toFixed(2)+" "+["B","kB","MB","GB","TB"][b]},a}]),app.factory("mdGenre",["$q","$http","config",function(a,b){var c=(angular.injector(["ng"]),function(a){angular.extend(this,a)});return c.list=function(){var c=a.defer();return b.get("/data/genres.json").success(function(a){c.resolve(a)}),c.promise},c}]),app.factory("mdVideo",["$q","$http","config",function(a,b,c){var d=(angular.injector(["ng"]),function(a){angular.extend(this,a)});return d.list=function(d,e,f){var g=a.defer(),d=d||1,e=e||10,f=f||!1;return b.get(c.apiBase+"/videos.json",{cache:!1,params:{page:d,per_page:e,status:f}}).success(function(a){g.resolve(a)}),g.promise},d.get=function(d){var e=a.defer();return b.get(c.apiBase+"/videos/"+d+".json",{},{headers:{Accept:void 0}}).success(function(a){e.resolve(a)}),e.promise},d.update=function(d){var e=a.defer();return b.put(c.apiBase+"/videos/"+d.id+".json",{video:d}).success(function(a){e.resolve(a)}),e.promise},d}]),app.factory("mdImdb",["$q","$http","config",function(a,b,c){var d=(angular.injector(["ng"]),function(a){angular.extend(this,a)});return d.list=function(d){var e=a.defer(),d=d||1;return b.get(c.apiBase+"/videos.json?page="+d).success(function(a){e.resolve(a)}),e.promise},d.get=function(d){var e=a.defer();return b.get(c.imdbBase+"?i="+d).success(function(a){e.resolve(a)}),e.promise},d.search=function(d){var e=a.defer();return b.get(c.imdbBase+"?s="+d).success(function(a){e.resolve(a)}),e.promise},d}]);