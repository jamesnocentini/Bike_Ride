'use strict';

angular.module('bikeApp')
  .factory('mapservice', function () {
    return {
      addMarker: function(data, icon_name, map){
          return new google.maps.Marker({
              position: new google.maps.LatLng(data.lat, data.lng),
              map: map,
              icon: icon_name
          })
      }
    };
  });
