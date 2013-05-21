'use strict';

angular.module('bikeApp')
  .controller('MapCtrl', function ($scope, socket, mapservice) {

        var bluedot = './../../assets/icons/pins/bluedot.png';


        var init = true;
        var marker;
        socket.on('socket:gps', function(data) {
            if(init) {
                init = false;
            } else {
                marker.setMap(null);
            }
            marker = mapservice.addMarker(data, bluedot, $scope.map);
        })


  });
