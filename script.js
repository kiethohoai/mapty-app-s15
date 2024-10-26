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

let map, mapEvent;

//Geolocation API
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
      map = L.map('map').setView(coords, 13);

      L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords).addTo(map).bindPopup('My Location').openPopup();

      // Handle Click On Map
      map.on('click', function (mapE) {
        mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
      });
    },
    // Fail to get current position
    function () {
      alert(`Could not get your current position!`);
    },
  );
}

// FORM HANDLER
form.addEventListener('submit', function (e) {
  // Prevent default behavior of the form
  e.preventDefault();

  // Clear all input fields
  inputDistance.value = '';
  inputDuration.value = '';
  inputCadence.value = '';
  inputElevation.value = '';

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

// Handle Select on InputType
inputType.addEventListener('change', (e) => {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
