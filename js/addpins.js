// Файл pin.js — модуль, который отвечает за создание пина — метки на карте
'use strict';

(function () {

  // Задаем шаблон для пинов
  var mapPinTemplate = document
    .querySelector('template')
    .content.querySelector('.map__pin');

  // Область для вставки
  var mapPinsArea = document.querySelector('.map__pins');

  // Функция создания пина
  function createPin (listing) {
    var mapPin = mapPinTemplate.cloneNode(true);

    mapPin.style =
      'left:' + (listing.location.x - 20) + 'px; ' +
      'top: ' + (listing.location.y - 40) + 'px;';

    mapPin.querySelector('img').src = listing.author.avatar;
    mapPin.querySelector('img').alt = listing.offer.title;

    return mapPin;
  }

  // Функция добавления пинов на страницу
  window.addPins = function (data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length - 1; i++) {
      var pinNode = createPin(data[i]);
      pinNode.listingData = data[i];
      pinNode.classList.add('hidden');
      fragment.appendChild(pinNode);
    }

    mapPinsArea.appendChild(fragment);
  };


})()