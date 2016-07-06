(function(angular){
  angular.module('app.common')
  .directive('toggleElement',["$window","$location", toggleElement])
  .directive('scrollDown', ["$window","$location", scrollDown]);
  function toggleElement($window,$location) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var path = $location.path();
        console.log(element);
        console.log(attrs.toggleElement);
        $(element[0]).on('click',function(){
          console.log('click works');
          if(path.indexOf('/home')==-1){
              $(attrs.toggleElement).slideToggle();
          }

        });


        console.log('****toggle dircetives**********');
        var lastScrollTop = 0;

        if(path.indexOf('/home')==-1){
          console.log("can try this");


        }

      }
    };
  }


function scrollDown($window,$location) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      console.log('dircetives************');
      var lastScrollTop = 0;
      var path = $location.path();
      console.log($location.path());
      if(path.indexOf('/home')==-1){
        console.log("can try this");

        $(window).on("scroll", function() {
          windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
          if(path.indexOf('/home')==-1 && ($(window).scrollTop()>170)){
          //  console.log($(document).scrollTop());
            if (windowWidth <= 601 && path.indexOf('/home')==-1 && ($(window).scrollTop()>170)) {
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
