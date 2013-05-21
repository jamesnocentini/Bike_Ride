'use strict';

angular.module('bikeApp')
  .directive('mapUi', function ($http) {
    return {
      template: '<div id="map-canvas"></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
          var directionsDisplay;
          var directionsService = new google.maps.DirectionsService();
          var elevationService;
          var map;

          var start_icon = './../../assets/icons/pins/pin4.png';
          var end_icon = './../../assets/icons/pins/pin2.png';
          var stop_icon = './../../assets/icons/pins/pin1.png';
          var elevation_icon = './../../assets/icons/pins/pin9.png';



          var chart = null;

          var mousemarker = null;
          var markers = [];
          var polyline = null;
          var elevations = null;

          var SAMPLES = 256;



          function initialize() {
              directionsDisplay = new google.maps.DirectionsRenderer();
              directionsDisplay.setOptions({
                  suppressMarkers: true
              })
              var mapOptions = {
                  center: new google.maps.LatLng(50.2, 2.5),
                  zoom: 4,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
              };
              map = new google.maps.Map(document.getElementById("map-canvas"),
                  mapOptions);
              scope.map = map;
              directionsDisplay.setMap(map);

              chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
              elevationService = new google.maps.ElevationService();

              google.visualization.events.addListener(chart, 'onmouseover', function(e) {
                  if (mousemarker == null) {
                      mousemarker = new google.maps.Marker({
                          position: elevations[e.row].location,
                          map: map,
                          icon: elevation_icon
                      });
                  } else {
                      mousemarker.setPosition(elevations[e.row].location);
                  }
              });


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
                  travelMode: google.maps.DirectionsTravelMode.DRIVING,
                  avoidHighways: true
              };
              directionsService.route(request, function(response, status) {
                  if(status == google.maps.DirectionsStatus.OK) {
                      directionsDisplay.setDirections(response);

                      elevationService.getElevationAlongPath({
                          path: response.routes[0].overview_path,
                          samples: SAMPLES
                      }, plotElevation);
                      console.log(response, status)
                  } else {
                      console.log(response, status)
                  }
              })
          }

          // Takes an array of ElevationResult objects, draws the path on the map
// and plots the elevation profile on a GViz ColumnChart
          function plotElevation(results) {
              elevations = results;

              var path = [];
              for (var i = 0; i < results.length; i++) {
                  path.push(elevations[i].location);
              }

              if (polyline) {
                  polyline.setMap(null);
              }

              polyline = new google.maps.Polyline({
                  path: path,
                  strokeColor: "#000000",
                  map: map});

              var data = new google.visualization.DataTable();
              data.addColumn('string', 'Sample');
              data.addColumn('number', 'Elevation');
              for (var i = 0; i < results.length; i++) {
                  data.addRow(['', elevations[i].elevation]);
              }

              chart.draw(data, {
                  width: 460,
                  height: 200,
                  legend: 'none',
                  titleY: 'Elevation (m)',
                  focusBorderColor: '#00ff00',
//                  backgroundColor: {fill: 'green'},
                  backgroundColor: '#F4F4C3',
                  fontName: 'Courrier',
                  vAxis: {textStyle:{color: 'red'}}
              });
          }

          initialize();
//          calcRoute("London", "Paris", true, ["Calais", "Abbeville, FR", "Beauvais"]);
          calcRoute({lat: 51.5133094, lng: -0.1593922}, {lat: 48.8737808, lng: 2.2950261}, false, [
              {
                  lat: 50.95129,
                  lng: 1.858686
              },
              {
                  lat: 50.105467,
                  lng: 1.836833
              },
              {
                  lat: 49.42964,
                  lng: 2.081875
              }
          ]);




      }
    };
  });
