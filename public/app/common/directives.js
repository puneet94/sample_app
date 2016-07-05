(function(angular){
  angular.module('app.common')
  .directive('scrollDown', ["$window","$location", scrollDown]);

function scrollDown($window,$location) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      console.log('dircetives****************');
      var lastScrollTop = 0;
      var path = $location.path();
      console.log($location.path());
      if(path.indexOf('/home')==-1){
        console.log("can try this");

        $(window).on("scroll", function() {
          windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
          if(path.indexOf('/home')==-1 && ($(window).scrollTop()>150)){
          //  console.log($(document).scrollTop());
            if (windowWidth <= 601) {
              var st = $(this).scrollTop();
              if (st > lastScrollTop) {

                $('.scrollUpSearch').slideUp("fast");
              } else {

                $('.scrollUpSearch').slideDown("fast");
              }
              lastScrollTop = st;
              scope.$apply();
            }
          }

        });

      }

    }
  };
}


})(window.angular);
