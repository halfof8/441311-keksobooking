//Данные для атрибутов листинга

window.createListing = function (id) {

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


  var x = window.util.getRandomInt(300, 900);
  var y = window.util.getRandomInt(150, 500);

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
      price: window.util.getRandomInt(1000, 1000000),
      type: typeList[window.util.getRandomInt(0, typeList.length - 1)],
      rooms: window.util.getRandomInt(1, 5),
      guests: window.util.getRandomInt(1, 10),
      checkin: timeList[window.util.getRandomInt(0, timeList.length - 1)],
      checkout: timeList[window.util.getRandomInt(0, timeList.length - 1)],
      features: window.util.ammendString(featuresList),
      description: '',
      photos: window.util.shuffleArray(photosList)
    }
  };

}
