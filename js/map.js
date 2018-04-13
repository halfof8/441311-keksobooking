//Количество элментов листинга
var amount = 8;

//Данные для атрибутов листинга
var listings = [];
var titleList = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var typeList = ['palace', 'flat', 'house', 'bungalo'];
var timeList = ['12:00', '13:00', '14:00'];
var featuresList = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var photosList = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

// Задаем DOM объекты карты
var mapObject = document.querySelector('.map');
var mapPinsArea = mapObject.querySelector('.map__pins');

var draggablePin = mapPinsArea.querySelector('.map__pin--main');

var mapFilters = mapObject.querySelector('.map__filters-container');

var yourNotice = document.querySelector('.notice');
var adFormNotice = document.querySelector('.ad-form');
var fieldsNotice = yourNotice.querySelectorAll('fieldset');

var yourAdr = document.getElementById('address');
var yourHomeType = document.getElementById('type');
var yourHomePrice = document.getElementById('price');
var yourRoomNumber = document.getElementById('room_number');
var yourCapacity = document.getElementById('capacity');
var capacityOptions = yourCapacity.querySelectorAll('option');

var yourTimeIn = document.getElementById('timein');
var yourTimeInOptions = yourTimeIn.querySelectorAll('option');

var yourTimeOut = document.getElementById('timeout');
var yourTimeOutOptions = yourTimeIn.querySelectorAll('option');


// Задаем шаблон для пинов
var mapPinTemplate = document
  .querySelector('template')
  .content.querySelector('.map__pin');

// Задаем шаблон для карточки
var mapCardTemplate = document
  .querySelector('template')
  .content.querySelector('.map__card');

// Задаем фрагмент
var fragment = document.createDocumentFragment();





// ============================= Основная область

// Деактивируем карту, формы. Подставляем адрес в флому
deactivateMap();
getAdress (draggablePin);

// Создаем массив объектов listing
for (var i = 0; i <= amount; i++) {
  listings[i] = createListing(i);
}



// Активация карты
draggablePin.addEventListener ('mouseup', function() {
  activateMap();
  draggablePin.removeEventListener('mouseup', function() {});
});

// Cоздадим пины
for (var i = 0; i < listings.length - 1; i++) {
  var pinNode = createPin(listings[i]);
  console.log(pinNode);
  pinNode.listingData = listings[i];
  console.log(pinNode.listingData);
  fragment.appendChild(pinNode);
}
// Добавим пины на страницу
mapPinsArea.appendChild(fragment);

// Найдем пины и скроем
mapPinsAll = mapPinsArea.querySelectorAll('.map__pin');

for (var i = 1; i < mapPinsAll.length; i++) {
  mapPinsAll[i].classList.add('hidden');
}


// Добавим карточку листинга, если уже есть – то сначала удалим, потом добавим
for (var i = 1; i < mapPinsAll.length; i++) {
  mapPinsAll[i].addEventListener('click', function(e) {
    var addedCard = mapObject.querySelector('.map__card');
    var currentCard = createCard(e.currentTarget.listingData);
    var closeButton = document.querySelector('.popup__close');

    if (addedCard) {
      addedCard.remove();
    }
    mapObject.insertBefore(currentCard, mapFilters);
    closeButton.addEventListener('click', function() {
      closePopup();
    });
  });
}


// Проверяем ввод типа жилья и изменяем плейсхолдер, минимальную цену
yourHomeType.addEventListener('input', function (evt) {
  var roomType = evt.target.value;

  if (roomType === 'flat') {
    yourHomePrice.placeholder = 1000;
    yourHomePrice.min = 1000;
  } else if (roomType === 'bungalo') {
    yourHomePrice.placeholder = 0;
    yourHomePrice.min = 0;
  } else if (roomType === 'house') {
    yourHomePrice.placeholder = 5000;
    yourHomePrice.min = 5000;
  } else {
    yourHomePrice.placeholder = 10000;
    yourHomePrice.min = 10000;
  }
});

// Следим, чтобы в поле цены вводили только цифры
yourHomePrice.addEventListener('input', function (evt) {
  validateDigits (evt);
});

// Проверяем ввод количества комнат
yourRoomNumber.addEventListener('input', function(evt) {
  var roomNumber = evt.target.value;
  var selectedRoomNumber = null;

  for (var i = 0; i < yourCapacity.length; i++) {
    if (yourCapacity[i].selected) {
      selectedRoomNumber = i;
    }
  }

  checkGuests(roomNumber, selectedRoomNumber);
});


// Проверяем ввод времени заезда и выезда, меняем их соответственно
yourTimeIn.addEventListener('input', function(evt) {
  checkTime(evt.target.value, yourTimeOut);
});

yourTimeOut.addEventListener('input', function(evt) {
  checkTime(evt.target.value, yourTimeIn);
});


// ============================= Область функций

// Функция генерация рандомного числа, включительно min, max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция слияния строк в одну строку для создания фичер-листа
function ammendString(array) {
  var amount = getRandomInt(1, array.length - 1);
  var resultString = '';

  for (var i = 0; i <= amount; i++) {
    resultString += array[i];
    if (i < amount) {
      resultString += ', ';
    }
  }
  return resultString;
}

// Функция перемешки массива, использую для создания массива фоток
function shuffleArray(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
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
}

// Функция создания листинга
function createListing (id) {
  var x = getRandomInt(300, 900);
  var y = getRandomInt(150, 500);

  return {
    author: {
      avatar: 'img/avatars/user0' + (id + 1) + '.png'
    },

    location: {
      x: x,
      y: y
    },

    offer: {
      title: titleList[id],
      address: x + ', ' + y,
      price: getRandomInt(1000, 1000000),
      type: typeList[getRandomInt(0, typeList.length - 1)],
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 10),
      checkin: timeList[getRandomInt(0, timeList.length - 1)],
      checkout: timeList[getRandomInt(0, timeList.length - 1)],
      features: ammendString(featuresList),
      description: '',
      photos: shuffleArray(photosList)
    }
  };
}


// Функция рендеринга карточки
function createCard (listing) {
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

  for (i = 0; i < listing.offer.photos.length; i++) {
    var photoInner = photoItem.cloneNode(true);
    photoInner.src = listing.offer.photos[i];
    photoBlock.appendChild(photoInner);
  }

  mapCard.querySelector('img').src = listing.author.avatar;

  return mapCard;
}


// Функция активации карты
function activateMap () {
  mapObject.classList.remove('map--faded');
  adFormNotice.classList.remove('ad-form--disabled');

  for (i = 0; i < fieldsNotice.length; i++) {
    fieldsNotice[i].disabled = false;
  }

  mapPinsArea.classList.remove('map--faded');
  getAdress (draggablePin);

  for (var i = 0; i < mapPinsAll.length; i++) {
    mapPinsAll[i].classList.remove('hidden');
  }

};


// Функция деактивации всего на старте
function deactivateMap () {
  mapObject.classList.add('map--faded');
  adFormNotice.classList.add('ad-form--disabled');
  for (i = 0; i < fieldsNotice.length; i++)
  {
    fieldsNotice[i].disabled = true;
  }
};

// Функция координаты пина
function getAdress (el) {
  el = el.getBoundingClientRect();
  var globalPosition = {
    left: el.left + window.scrollX + 20,
    top: el.top + window.scrollY + 22
  }
  yourAdr.value = globalPosition.left + ', ' + globalPosition.top;
}


// Функция закрытия попапа
function closePopup () {
  var addedCard = mapObject.querySelector('.map__card');
  addedCard.remove();
};

// Функция валидации ввода цены
function validateDigits (evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}


// Функция изменения формы количества гостей
function checkGuests(number, selectedNumber) {
  if (number == 1) {
    capacityOptions[0].disabled = true;
    capacityOptions[1].disabled = true;
    capacityOptions[2].disabled = false;
    capacityOptions[3].disabled = true;

    capacityOptions[2].selected = true;
  } else if (number == 2) {
    capacityOptions[0].disabled = true;
    capacityOptions[1].disabled = false;
    capacityOptions[2].disabled = false;
    capacityOptions[3].disabled = true;
    if (selectedNumber == 0 || selectedNumber == 3) {
      capacityOptions[1].selected = true;
    }
  } else if (number == 3) {
    capacityOptions[0].disabled = false;
    capacityOptions[1].disabled = false;
    capacityOptions[2].disabled = false;
    capacityOptions[3].disabled = true;

    if (selectedNumber == 3) {
      capacityOptions[0].selected = true;
    }
  } else {
    capacityOptions[0].disabled = true;
    capacityOptions[1].disabled = true;
    capacityOptions[2].disabled = true;
    capacityOptions[3].disabled = false;

    capacityOptions[3].selected = true;
  }
}

// Функция выбора времени
function checkTime(time, selectedInput) {
  if (time == '12:00') {
    selectedInput[0].selected = true;
  } else if (time == '13:00') {
    selectedInput[1].selected = true;
  } else {
    selectedInput[2].selected = true;
  }
}
