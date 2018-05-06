// Файл addpin.js — модуль, который отвечает за добавление пинов на карту
'use strict';

(function () {
  var mapObject = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters-container');
  
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
    var takeNumber = data.length > 5 ? 5 : data.length;

    var mapPinsAll = mapPinsArea.querySelectorAll('.map__pin');

    for (var i = 1; i < mapPinsAll.length; i++) {
      mapPinsAll[i].remove();
    }

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < takeNumber; i++) {
      var pinNode = createPin(data[i]);
      pinNode.listingData = data[i];
      // pinNode.classList.add('hidden');
      fragment.appendChild(pinNode);
    }

    mapPinsArea.appendChild(fragment);
    mapPinsAll = mapPinsArea.querySelectorAll('.map__pin');
    window.clickOnPins (mapPinsAll);
  };


  window.clickOnPins = function  (mapPinsAll) {
    // Cлушаем клики на пины, добавим карточку листинга,
    // если уже есть – то сначала удалим, потом добавим
    for (var i = 1; i < mapPinsAll.length; i++) {
      mapPinsAll[i].addEventListener('click', function (e) {
          var addedCard = mapObject.querySelector('.map__card');
          var currentCard = window.createCard(e.currentTarget.listingData);
          var closeButton = currentCard.querySelector('.popup__close');

          if (addedCard) {
              addedCard.remove();
          }

          mapObject.insertBefore(currentCard, mapFilters);
          closeButton.addEventListener('click', function () {
              var addedCard = mapObject.querySelector('.map__card');
              addedCard.remove();
          });
      });
  } 
}


})()