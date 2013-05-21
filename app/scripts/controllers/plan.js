'use strict';

angular.module('bikeApp')
  .controller('PlanCtrl', function ($scope, $http) {



        $scope.trip = [
            {
                name: "London - Calais",
                distance: "84.89",
                pace: "5",
                time: "7:04:26",
                iframe: "http://connect.garmin.com:80/course/embed/2754014",
                mt: "-320",
                image: "http://placehold.it/460x200"
            },
            {
                name: "Calais - Abbeville",
                distance: "77.98",
                pace: "5",
                time: "6:29:53",
                iframe: "http://connect.garmin.com:80/course/embed/2759653",
                mt: "-300",
                image: "http://placehold.it/460x200"
            },
            {
                name: "Abbeville - Beauvais",
                distance: "63.9",
                pace: "5",
                time: "5:19:30",
                iframe: "http://connect.garmin.com:80/course/embed/2759801",
                mt: "-280",
                image: "http://placehold.it/460x200"
            },
            {
                name: "Beauvais - Paris",
                distance: "51.47",
                pace: "5",
                time: "5:17:20",
                iframe: "http://connect.garmin.com:80/course/embed/2759801",
                mt: "-260",
                image: "http://placehold.it/460x200"
            }



        ];
  });
