// Файл filter.js
'use strict';

(function () {

  var housingType = document.getElementById('housing-type');
  var housingPrice = document.getElementById('housing-price');
  var housingRooms = document.getElementById('housing-rooms');
  var housingGuests = document.getElementById('housing-guests');
  var housingFeatures = document.getElementById('housing-features');
  var featuresCheckboxes = document.querySelectorAll('.map__checkbox');

  var features = {
    conditioner: false,
    dishwasher: false,
    elevator: false,
    parking: false,
    washer: false,
    wifi: false
  };

  var filters = {
    onTypeChange: function (data) {},
    onPriceChange: function (data) {},
    onRoomsChange: function (data) {},
    onGuestsChange: function (data) {},
    onFeaturesChange: function (data) {}
  }

  housingType.addEventListener('input', function (evt) {
    var newType = evt.target.value;
    filters.onTypeChange(newType);
  });

  housingPrice.addEventListener('input', function (evt) {
    var newPrice = evt.target.value;
    filters.onPriceChange(newPrice);
  });


  housingRooms.addEventListener('input', function (evt) {
    var newRooms = evt.target.value;
    filters.onRoomsChange(newRooms);
  });


  housingGuests.addEventListener('input', function (evt) {
    var newGuests = evt.target.value;
    filters.onGuestsChange(newGuests);
  });

  for (var i = 0; i < featuresCheckboxes.length; i++) {
    featuresCheckboxes[i].addEventListener('change', function (evt) {
      features[evt.target.value] = evt.target.checked;
      filters.onFeaturesChange(features);
    });
  }

  return window.filters = filters;
})()

