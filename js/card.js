// Файл cards.js - функция создания карточки, иницируется кликом
'use strict';

(function () {

  // Задаем шаблон для карточки
  var mapCardTemplate = document
    .querySelector('template')
    .content.querySelector('.map__card');

  // Функция рендеринга карточки
  window.createCard = function (listing) {
    var mapCard = mapCardTemplate.cloneNode(true);
    var photoBlock = mapCard.querySelector('.popup__photos');
    var photoItem = photoBlock.querySelector('img');

    mapCard.querySelector('.popup__title').textContent = listing.offer.title;

    mapCard.querySelector('.popup__text--price').textContent =
      listing.offer.price + ' ₽/ночь';

    mapCard.querySelector('.popup__text--address').textContent =
      listing.offer.address;

    if (listing.offer.type === 'flat') {
      mapCard.querySelector('.popup__type').textContent = 'Квартира';
    } else if (listing.offer.type === 'bungalo') {
      mapCard.querySelector('.popup__type').textContent = 'Бунгало';
    } else if (listing.offer.type === 'house') {
      mapCard.querySelector('.popup__type').textContent = 'Дом';
    } else {
      mapCard.querySelector('.popup__type').textContent = 'Дворец ';
    }

    mapCard.querySelector('.popup__text--capacity').textContent =
      listing.offer.rooms + ' комнаты для ' + listing.offer.guests + ' гостей.';

    mapCard.querySelector('.popup__text--time').textContent =
      'Заезд после ' + listing.offer.checkin +
      ' выезд до ' + listing.offer.checkout;

    mapCard.querySelector('.popup__features').textContent =
      listing.offer.features;

    mapCard.querySelector('.popup__description').textContent =
      listing.offer.description;

    photoBlock.removeChild(photoItem);

    for (var i = 0; i < listing.offer.photos.length; i++) {
      var photoInner = photoItem.cloneNode(true);
      photoInner.src = listing.offer.photos[i];
      photoBlock.appendChild(photoInner);
    }

    mapCard.querySelector('img').src = listing.author.avatar;

    return mapCard;
  }


})()