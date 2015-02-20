app.directive("mySrc", function() {
    return {
      link: function(scope, element, attrs) {
        var img, loadImage;
        img = null;

        loadImage = function() {
          var parent = element.parent();
          parent.addClass('loading')

          img = new Image();
          img.src = attrs.mySrc;
          img.onload = function() {
            element[0].src = attrs.mySrc;
            parent.removeClass('loading');
          };
        };

        scope.$watch((function() {
          return attrs.mySrc;
        }), function(newVal, oldVal) {

          loadImage();
        });
      }
    };
  });