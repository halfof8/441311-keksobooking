var AMOUNT = 8;

window.yourAdr = document.getElementById('address');

// Задаем DOM объекты карты
var mapObject = document.querySelector('.map');
var mapPinsArea = mapObject.querySelector('.map__pins');
var draggablePin = mapPinsArea.querySelector('.map__pin--main');
var STARTADRESS = window.util.getCoords(draggablePin);

var yourNotice = document.querySelector('.notice');
var adFormNotice = document.querySelector('.ad-form');
var fieldsNotice = yourNotice.querySelectorAll('fieldset');

var mapFilters = mapObject.querySelector('.map__filters-container');

var listings = [];

// Задаем шаблон для пинов
var mapPinTemplate = document
  .querySelector('template')
  .content.querySelector('.map__pin');

// Задаем фрагмент
var fragment = document.createDocumentFragment();

// Подставляем адрес в форму
window.yourAdr.value = window.util.getCoords(draggablePin).left + ', ' + window.util.getCoords(draggablePin).top;

// Создаем массив объектов listing
for (var i = 0; i <= AMOUNT; i++) {
  listings[i] = window.createListing(i);
}

// Cоздадим пины-соседи
for (var i = 0; i < listings.length - 1; i++) {
  var pinNode = createPin(listings[i]);
  pinNode.listingData = listings[i];
  fragment.appendChild(pinNode);
}

// Добавим пины на страницу
mapPinsArea.appendChild(fragment);
mapPinsAll = mapPinsArea.querySelectorAll('.map__pin');

// Деактивируем карту
deactivateMap();


// Слушаем клик миши по основному пину
draggablePin.addEventListener ('mousedown', function(downEvt) {
  downEvt.preventDefault();
  activateMap();

  var pinCoords = window.util.getPosition(draggablePin);

  var shiftX = downEvt.pageX - pinCoords.left;
  var shiftY = downEvt.pageY - pinCoords.top;

  var mapBoxCoords = window.util.getPosition(mapPinsArea);

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();

    var newLeft = moveEvt.pageX - shiftX - mapBoxCoords.left;
    var newTop = moveEvt.pageY - shiftY - mapBoxCoords.top;

    if (newLeft < 0) {
      newLeft = 0;
    }
    var rightEdge = mapPinsArea.offsetWidth - draggablePin.offsetWidth;

    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    if (newTop < 0) {
      newTop = 0;
    }
    var bottomEdge = mapPinsArea.offsetHeight - draggablePin.offsetHeight;

    if (newTop > bottomEdge) {
      newTop = bottomEdge;
    }

    draggablePin.style.left = newLeft + 'px';
    draggablePin.style.top = newTop + 'px';
    window.yourAdr.value = window.util.getCoords(draggablePin).left + ', ' + window.util.getCoords(draggablePin).top;
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();
    window.yourAdr.value = window.util.getCoords(draggablePin).left + ', ' + window.util.getCoords(draggablePin).top;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener ('mousemove', onMouseMove);
  document.addEventListener ('mouseup',  onMouseUp);
  return false; // disable selection start (cursor change)
});

draggablePin.ondragstart = function () {
  return false;
};


// Cлушаем клики на пины, добавим карточку листинга, если уже есть – то сначала удалим, потом добавим
for (var i = 1; i < mapPinsAll.length; i++) {
  mapPinsAll[i].addEventListener('click', function(e) {
    var addedCard = mapObject.querySelector('.map__card');
    var currentCard = window.createCard(e.currentTarget.listingData);
    var closeButton = currentCard.querySelector('.popup__close');

    if (addedCard) {
      addedCard.remove();
    }

    mapObject.insertBefore(currentCard, mapFilters);
    closeButton.addEventListener('click', function() {
      var addedCard = mapObject.querySelector('.map__card');
      addedCard.remove();
    });
  });
}

// Функция рендеринга пинов
function createPin (listing) {
  var mapPin = mapPinTemplate.cloneNode(true);
  mapPin.style =
    'left:' + (listing.location.x - 20) + 'px; ' +
    'top: ' + (listing.location.y - 40) + 'px;';

  mapPin.querySelector('img').src = listing.author.avatar;
  mapPin.querySelector('img').alt = listing.offer.title;

  return mapPin;
};

// Функция деактивации всего на старте
function deactivateMap () {
  mapObject.classList.add('map--faded');
  adFormNotice.classList.add('ad-form--disabled');
  mapPinsArea.classList.add('map--faded');

  for (i = 0; i < fieldsNotice.length; i++) {
    fieldsNotice[i].disabled = true;
  }
  draggablePin.style = "left: " + STARTADRESS.left + 'px; top: ' +  STARTADRESS.top + "px;";

  for (var i = 1; i < mapPinsAll.length; i++) {
    mapPinsAll[i].classList.add('hidden');
   }
};

// Функция активации карты
function activateMap () {
  mapObject.classList.remove('map--faded');
  adFormNotice.classList.remove('ad-form--disabled');
  mapPinsArea.classList.remove('map--faded');

  for (i = 0; i < fieldsNotice.length; i++) {
    fieldsNotice[i].disabled = false;
  }

  for (var i = 0; i < mapPinsAll.length; i++) {
    mapPinsAll[i].classList.remove('hidden');
  }
};
