// Файл pin.js — модуль, который отвечает за создание пина — метки на карте
'use strict';

// Задаем шаблон для пинов
var mapPinTemplate = document
  .querySelector('template')
  .content.querySelector('.map__pin');

// Функция рендеринга пинов
window.createPin = function (listing) {
  var mapPin = mapPinTemplate.cloneNode(true);
  mapPin.style =
    'left:' + (listing.location.x - 20) + 'px; ' +
    'top: ' + (listing.location.y - 40) + 'px;';

  mapPin.querySelector('img').src = listing.author.avatar;
  mapPin.querySelector('img').alt = listing.offer.title;

  return mapPin;
}
