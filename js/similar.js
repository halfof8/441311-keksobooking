// Файл similar.js - получаем  данные и апдейтим
'use strict';

(function () {
  var filterType = 'any';
  var filterPrice = 'any';
  var filterRooms = 'any';
  var filterGuests = 'any';

  var filterFeatures = [];

  var lastTimeout;
  var listings = [];
  var mapPinsArea = document.querySelector('.map__pins');


  window.filters.onTypeChange = function (type) {
    filterType = type;
    window.debounce(updatePins);
  }

  window.filters.onPriceChange = function (price) {
    filterPrice = price;
    window.debounce(updatePins);
  }

  window.filters.onRoomsChange = function (rooms) {
    filterRooms = rooms;
    window.debounce(updatePins);
  }

  window.filters.onGuestsChange = function (guests) {
    filterGuests = guests;
    window.debounce(updatePins);
  }

  window.filters.onFeaturesChange = function (features) {
    filterFeatures = [];

    for (var key in features) {
      if (features[key]) {
        filterFeatures.push(key);
      }
    }
    window.debounce(updatePins);
  }


  function checkFilters(arr) {


    if (filterType != 'any') {
      arr = arr.filter(filterByType);
    }

    if (filterPrice != 'any') {
      arr = arr.filter(filterByPrice);
    }

    if (filterRooms != 'any') {
      arr = arr.filter(filterByRooms);
    }

    if (filterGuests != 'any') {
      arr = arr.filter(filterByGuests);
    }

    if (filterFeatures.length >= 1) {
      arr = arr.filter(filterByFeatures);
    }


    function filterByType(item) {
      if (item.offer.type === filterType) {
        return true;
      }
      return false;
    }

    function filterByPrice(item) {
      if ((filterPrice === 'low') && (item.offer.price < 10000)) {
        return true;
      }
      if ((filterPrice === 'middle') && (item.offer.price > 10000 || item.offer.price < 50000)) {
        return true;
      }
      if ((filterPrice === 'high') && (item.offer.price > 50000)) {
        return true;
      }

      return false;
    }

    function filterByRooms(item) {
      if (item.offer.rooms >= filterRooms) {
        return true;
      }
      return false;
    }

    function filterByGuests(item) {
      if (item.offer.guests >= filterGuests) {
        return true;
      }
      return false;
    }

    function filterByFeatures(item) {
      var itemFeatures = item.offer.features;
      var notPresentInData = filterFeatures.filter(val => !itemFeatures.includes(val));

      if (notPresentInData.length < 1) {
        return true;
      }

      return false;
    }

    function getMissing(a, b) {
      var missings = [];
      var matches = false;

      for (var i = 0; i < a.length; i++) {
        matches = false;
        for (var e = 0; e < b.length; e++) {
          if (a[i] === b[e]) matches = true;
        }
        if (!matches) missings.push(a[i]);
      }
      return missings;
    }

    return arr;
  };


  function successHandler(data) {
    listings = data;
    updatePins();
    var mapPinsAll = mapPinsArea.querySelectorAll('.map__pin');
    for (var i = 1; i < mapPinsAll.length; i++) {
      mapPinsAll[i].classList.add('hidden');
    }
  };

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function updatePins() {
    var listingsFiltered = listings.slice(0);
    listingsFiltered = checkFilters(listingsFiltered);
    window.addPins(listingsFiltered);
  }


  window.backend.load(successHandler, errorHandler);



})();

