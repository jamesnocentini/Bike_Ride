'use strict';

angular.module('bikeApp')
  .directive('launchUi', function ($location) {
    return {
      template: '<img class="poster" src="./../assets/images/tumblr_mn0154ESdI1qzq9klo1_1280.jpg">',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {


        setTimeout(
            function() {
                element.fadeOut(2000, function() {
                    element.next().removeClass('hide')
                })

            }
        , 3000)
      }
    };
  });
