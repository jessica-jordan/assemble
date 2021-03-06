/* global google, handleLocationError, pos */
import Ember from 'ember';

export default Ember.Service.extend({
  // this whole thing is from the Google Maps API geolocation example
  initMap() {
      let map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 20
      });

      let infoWindow = new google.maps.InfoWindow({map: map});

      // try HTML5 geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
  },

  handleLocationError(browserHasGeolocation, infoWindow) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: the geolocation service failed' : "Error: your browser doesn't support geolocation");
  }
});
