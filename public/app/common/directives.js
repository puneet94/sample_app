/*common directives like scroll..*/
(function(angular){
  angular.module('app.common')
  .directive('toggleElement',["$window","$location", toggleElement])
  .directive('scrollDown', ["$window","$location", scrollDown])
  .directive('toggleMobile',["$window","$location", toggleMobile])
  .directive('loadingDirective',[loadingDirective])
  .directive('metaTags',[metaTagsDirective])
  .directive('likeDirective',[likeDirective])
  .directive('smallLoadingDirective',[smallLoadingDirective]);
  function toggleElement($window,$location) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var path = $location.path();

        $(element[0]).on('click',function(){
          if(path.indexOf('/home')==-1){
              $(attrs.toggleElement).slideToggle();
          }
        });



        var lastScrollTop = 0;

        if(path.indexOf('/home')==-1){


        }

      }
    };
  }


function scrollDown($window,$location) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      var lastScrollTop = 0;
      var path = $location.path();

      if(path.indexOf('/home')==-1){


        $(window).on("scroll", function() {
          windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
          if(path.indexOf('/home')==-1 && ($(window).scrollTop()>170)){
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

function toggleMobile($window,$location) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      $(element).on('click',function(){
        windowWidth = window.innerWidth ? window.innerWidth : $(window).width();

          if (windowWidth <= 961 ) {

            $(attrs.toggleMobile).slideToggle();
            scope.$apply();

          }


      });






    }
  };
}

function loadingDirective() {
      return {
        restrict: 'E',
        replace:true,
        scope:{
          loading:"=loading"
        },
        template: '<div class="ajaxLoadingSpinnerDiv"><div class="ajaxLoadingSpinner"></div></div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      };
  }
  function smallLoadingDirective() {
      return {
        restrict: 'EA',
        replace:true,
        scope:{
          smallLoading:"=smallLoading"
        },
        template: '<span style="position:relative"><div class="spinner"></div></span>',
        link: function (scope, element, attr) {

              scope.$watch('smallLoading', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      };
  }

  function metaTagsDirective(){
    return {
      restrict: 'A',
      link: function(scope, element, attr){
        var keywords = $('meta[name=Keywords]').attr('content');
        var description = $('meta[name=Description]').attr('content');
        console.log();
        //$('meta[name=keywords]').attr('content', 'some random keywords');
      }
    };
  }
  function likeDirective(){
    return {
      restrict: 'E',
      scope: {
        upFn:'&upFn',
        downFn:'&downFn',
        upvChk:'&upvChk',
        smallLoading:'=smallLoading'
      },
      templateUrl: 'app/reviews/views/likeReview.html'
    };
  }

})(window.angular);
