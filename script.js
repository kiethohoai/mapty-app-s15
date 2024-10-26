'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//todo Geolocation API
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    // Success to get current location
    function (position) {
      const { latitude, longitude } = position.coords;

      // console.log(`🚀  latitude, longitude =>`, latitude, longitude);
      // console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      // Current location marker
      const coords = [latitude, longitude];

      // Leaflet map
      const map = L.map('map').setView(coords, 13);

      L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords).addTo(map).bindPopup('My Location').openPopup();

      // Evemt Handlers
      map.on('click', function (mapEvent) {
        const { lat, lng } = mapEvent.latlng;
        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 100,
              autoClose: false,
              closeOnClick: false,
              className: 'running-popup',
            }),
          )
          .setPopupContent('Workout')
          .openPopup();
      });
    },
    // Fail to get current position
    function () {
      alert(`Could not get your current position!`);
    },
  );
}
