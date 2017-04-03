// app.directive("mySrc", function() {
//     return {
//         link: function(scope, element, attrs) {
//             var img, loadImage;
//             img = null;

//             loadImage = function() {
//                 var parent = element.parent();
//                 parent.addClass('loading')

//                 img = new Image();
//                 img.src = attrs.mySrc;
//                 img.onload = function() {
//                     element[0].src = attrs.mySrc;
//                     parent.removeClass('loading');
//                 };
//             };

//             scope.$watch((function() {
//                 return attrs.mySrc;
//             }), function(newVal, oldVal) {

//                 loadImage();
//             });
//         }
//     };
// });

app.directive("lazySrc", function($document, $window, $timeout) {
    var lazyImages = [];
    var docHeight = 0;
    var winHeight = $window.innerHeight;

    function loadImage(){
        $('img.is-loading').each(function(index){
        	var $this = $(this);
            if(!$this.hasClass('loaded')){
                if($this.get(0).getBoundingClientRect().top < (winHeight) ){
                  $this.attr("src", $this.attr("lazy-src"))
                  .removeClass('is-loading')
                  .addClass('loaded')
                    // $this.load(function(){
            //             lazyImages.splice(index, 0);
            //             $(this).removeClass('is-loading').addClass('loaded')
                    // }).attr("src", $this.attr("lazy-src")).addClass('is-loading');
                }
            }
        })
    }

    $(window).on('scroll', function(){
        delayLoading();
    });
    $(window).on('resize', function(){
        winHeight = $window.innerHeight;
        delayLoading();
    });


    setInterval(function(){
        if(docHeight != $document.height()){
            loadImage();
            winHeight = $window.innerHeight;
            docHeight = $document.height();
        }
    }, 0)

    var timer;
    var delayLoading = function(){
    	if(timer) clearInterval(timer);

    	timer = setTimeout(function(){
	    	loadImage();
    	}, 50)
    }

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            delayLoading();
        }
    };
});
