var amount = 8;
var listings = [];
var titleList = [
  "Большая уютная квартира",
  "Маленькая неуютная квартира",
  "Огромный прекрасный дворец",
  "Маленький ужасный дворец",
  "Красивый гостевой домик",
  "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря",
  "Неуютное бунгало по колено в воде"
];
var typeList = ["palace", "flat", "house", "bungalo"];
var timeList = ["12:00", "13:00", "14:00"];
var featuresList = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner"
];
var photosList = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];

// Returns a random integer between min (included) and max (included)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Add consiquense string, для создания фичер-листа
function ammendString(array) {
  var amount = getRandomInt(1, array.length - 1);

  var resultString = "";

  for (var i = 0; i <= amount; i++) {
    resultString += array[i];
    if (i < amount) {
      resultString += ", ";
    }
  }
  return resultString;
}

// Shuffled array, использую для создания массива фоток
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

// Создаем массив объектов
for (var i = 0; i <= amount; i++) {
  var x = getRandomInt(300, 900);
  var y = getRandomInt(150, 500);

  var item = {
    author: {
      avatar: "img/avatars/user0" + (i + 1) + ".png"
    },

    location: {
      x: x,
      y: y
    },

    offer: {
      title: titleList[i],
      address: x + ", " + y,
      price: getRandomInt(1000, 1000000),
      type: typeList[getRandomInt(0, typeList.length - 1)],
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 10),
      checkin: timeList[getRandomInt(0, timeList.length - 1)],
      checkout: timeList[getRandomInt(0, timeList.length - 1)],
      features: ammendString(featuresList),
      description: "",
      photos: shuffleArray(photosList)
    }
  };

  listings[i] = item;
}

console.log(listings);

//У блока .map убераем класс .map--faded
var mapObject = document.querySelector(".map");
mapObject.classList.remove("map--faded");

//Ищем область для меток
var mapPins = mapObject.querySelector(".map__pins");

//Ищем область фильтров
var mapFilters = mapObject.querySelector(".map__filters-container");

//Ищем шаблон для пинов
var mapPinTemplate = document
  .querySelector("template")
  .content.querySelector(".map__pin");

//Ищем шаблон для карточки
var mapCardTemplate = document
  .querySelector("template")
  .content.querySelector(".map__card");

console.log(mapCardTemplate);

//функция рендеринга пинов
function renderPins(listing) {
  var mapPin = mapPinTemplate.cloneNode(true);
  mapPin.style = " ";
  mapPin.style =
    "left:" +
    (listing.location.x - 20) +
    "px; top: " +
    (listing.location.y - 40) +
    "px;";

  mapPin.querySelector("img").src = listing.author.avatar;
  mapPin.querySelector("img").alt = listing.offer.title + ";";

  // Координаты:style="left: {{location.x}}px; top: {{location.y}}px;"
  // src="{{author.avatar}}"
  // alt="{{заголовок объявления}}"

  return mapPin;
}

//функция рендеринга карточки
function renderCard(listing) {
  var mapCard = mapCardTemplate.cloneNode(true);

  // Выведите заголовок объявления offer.title в заголовок .popup__title.
  mapCard.querySelector(".popup__title").textContent = listing.offer.title;

  // Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}}₽/ночь. Например, 5200₽/ночь.
  mapCard.querySelector(".popup__text--price").textContent =
    listing.offer.price + "₽/ночь";

  // Выведите адрес offer.address в блок .popup__text--address.
  mapCard.querySelector(".popup__text--address").textContent =
    listing.offer.address;

  // В блок .popup__type выведите тип жилья offer.type: Квартира для flat, Бунгало для bungalo, Дом для house, Дворец для palace.
  if (listing.offer.type === "flat") {
    mapCard.querySelector(".popup__type").textContent = "Квартира";
  } else if (listing.offer.type === "bungalo") {
    mapCard.querySelector(".popup__type").textContent = "Бунгало";
  } else if (listing.offer.type === "house") {
    mapCard.querySelector(".popup__type").textContent = "Дом";
  } else {
    mapCard.querySelector(".popup__type").textContent = "Дворец ";
  }

  // Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, 2 комнаты для 3 гостей.
  mapCard.querySelector(".popup__text--capacity").textContent =
    listing.offer.rooms + " комнаты для " + listing.offer.guests + " гостей.";

  // Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, заезд после 14:00, выезд до 12:00.
  mapCard.querySelector(".popup__text--time").textContent =
    "Заезд после " +
    listing.offer.checkin +
    " выезд до " +
    listing.offer.checkout;

  // В список .popup__features выведите все доступные удобства в объявлении.
  mapCard.querySelector(".popup__features").textContent =
    listing.offer.features;

  // В блок popup__description выведите описание объекта недвижимости offer.description.
  mapCard.querySelector(".popup__description").textContent =
    listing.offer.description;

  // В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.
  var photoBlock = mapCard.querySelector(".popup__photos");
  var photoItem = photoBlock.querySelector("img");
  photoBlock.removeChild(photoItem);

  for (i = 0; i < listing.offer.photos.length; i++) {
    var photoInner = photoItem.cloneNode(true);
    photoInner.src = listing.offer.photos[i];
    photoBlock.appendChild(photoInner);
  }

  // Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.
  mapCard.querySelector("img").src = listing.author.avatar;

  return mapCard;
}

//Добавляем во фрагмент
var fragment = document.createDocumentFragment();

for (var i = 0; i < listings.length - 1; i++) {
  fragment.appendChild(renderPins(listings[i]));
}

//Добавляем пины на страницу
mapPins.appendChild(fragment);

//Добавляем карточку на страницу
mapObject.insertBefore(renderCard(listings[0]), mapFilters);
