'use strict';

angular.module('bikeApp')
  .factory('socket', function ($rootScope) {
    var socket = io.connect(location.hostname);
    return {
      on: function (eventName, callback) {
          socket.on(eventName, function() {
              var args = arguments;
              callback.apply(socket, args);
          })
      },
      emit: function (eventName, data, callback) {
          socket.emit(eventName, data, function() {
              var args = arguments;
              callback.apply(socket, args);
          })
      }
    };
  });
