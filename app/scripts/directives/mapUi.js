'use strict';

angular.module('bikeApp')
  .directive('mapUi', function ($http) {
    return {
      template: '<div id="map-canvas"></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
          var directionsDisplay;
          var directionsService = new google.maps.DirectionsService();
          var map;

          var start_icon = './../../assets/icons/pins/pin4.png';
          var end_icon = './../../assets/icons/pins/pin2.png';
          var stop_icon = './../../assets/icons/pins/pin1.png';


          function initialize() {
              directionsDisplay = new google.maps.DirectionsRenderer();
              directionsDisplay.setOptions({
                  suppressMarkers: true
              })
              var mapOptions = {
                  center: new google.maps.LatLng(50.2, 2.5),
                  zoom: 7,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
              };
              map = new google.maps.Map(document.getElementById("map-canvas"),
                  mapOptions);
              scope.map = map;
              directionsDisplay.setMap(map);
          }


          var addMarker = function(LatLng, icon_name) {
              var marker = new google.maps.Marker({
                  position: LatLng,
                  map: map,
                  icon: icon_name,
                  animation: google.maps.Animation.DROP
              })
          };


          var calcRoute = function (start, end, isWord, stops) {
              if (isWord) {

                  var waypoints = [];
                  stops.forEach(function(stop) {
                      var waypoint = {};
                      waypoint.location = stop;
                      waypoints.push(waypoint)
                  })
              } else {

                  start = new google.maps.LatLng(start.lat, start.lng);
                  end = new google.maps.LatLng(end.lat, end.lng);
                  addMarker(start, start_icon);
                  addMarker(end, end_icon);


                  var waypoints = [];
                  stops.forEach(function(stop) {
                      var waypoint = {};
                      waypoint.location = new google.maps.LatLng(stop.lat, stop.lng);
                      waypoints.push(waypoint)
                      addMarker(waypoint.location, stop_icon)
                  })
              }

              var request = {
                  origin: start,
                  destination: end,
                  waypoints: waypoints,
                  travelMode: google.maps.DirectionsTravelMode.DRIVING
              };
              directionsService.route(request, function(response, status) {
                  if(status == google.maps.DirectionsStatus.OK) {
                      directionsDisplay.setDirections(response);
                      console.log(response, status)
                  } else {
                      console.log(response, status)
                  }
              })
          }

          initialize();
//          calcRoute("London", "Paris", true, ["Calais", "Abbeville, FR", "Beauvais"]);
          calcRoute({lat: 51.30, lng: 0.7}, {lat: 48.853, lng: 2.35}, false, [
              {
                  lat: 50.650,
                  lng: 3.083
              }
          ]);




      }
    };
  });
