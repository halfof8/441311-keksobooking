// Файл form.js — модуль, который работает с формой объявления.
'use strict';


var successMessage = document.querySelector('.success');

var yourHomeTitle = document.getElementById('title');

var yourHomeType = document.getElementById('type');
var yourHomeTypeOptions = yourHomeType.querySelectorAll('option');

var yourHomePrice = document.getElementById('price');

var yourRoomNumber = document.getElementById('room_number');
var yourRoomNumberOptions = yourRoomNumber.querySelectorAll('option');

var yourCapacity = document.getElementById('capacity');
var capacityOptions = yourCapacity.querySelectorAll('option');

var yourTimeIn = document.getElementById('timein');
var yourTimeInOptions = yourTimeIn.querySelectorAll('option');

var yourTimeOut = document.getElementById('timeout');
var yourTimeOutOptions = yourTimeIn.querySelectorAll('option');

var submitButton = document.querySelector('.ad-form__submit');
var clearButton = document.querySelector('.ad-form__reset');

var yourDescription = document.getElementById('description');


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

// Отправка данных
submitButton.addEventListener('click', function(evt) {
  if (window.yourAdr.checkValidity() && yourHomePrice.checkValidity() ) {
  successMessage.classList.remove('hidden');
  deactivateMap();
  clearValues();
  setTimeout(function(){
    successMessage.classList.add('hidden');
 }, 5000);
 }
});

submitButton.addEventListener('invalid', function() {
 alert('Произошла ошибка отправки');
});

// Очистка данных
clearButton.addEventListener('click', function() {
 clearValues();
});

// Проверка валидности
window.yourAdr.addEventListener('invalid', function (evt) {
  if (window.yourAdr.validity.tooShort) {
    window.yourAdr.setCustomValidity('Название не должно состоять меньше 2-х символов');
  } else if (window.yourAdr.validity.tooLong) {
    window.yourAdr.setCustomValidity('Название не должно превышать 100 символов');
  } else if (window.yourAdr.validity.valueMissing) {
    window.yourAdr.setCustomValidity('Обязательное поле');
  } else {
    window.yourAdr.setCustomValidity('');
  }
});

// Проверка валидности
yourHomePrice.addEventListener('invalid', function (evt) {
  if (yourHomePrice.validity.rangeOverflow) {
    yourHomePrice.setCustomValidity('Цена не должна быть больше 1 000 000');
  } else if (yourHomePrice.validity.valueMissing) {
    yourHomePrice.setCustomValidity('Обязательное поле');
  } else {
    yourHomePrice.setCustomValidity('');
  }
});


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

  capacityOptions.forEach(function(item) {
    item.disabled = true;
  });

  if (number == 1) {
    capacityOptions[2].disabled = false;
    capacityOptions[2].selected = true;
  } else if (number == 2) {
    capacityOptions[1].disabled = false;
    capacityOptions[2].disabled = false;
    if (selectedNumber == 0 || selectedNumber == 3) {
      capacityOptions[1].selected = true;
    }
  } else if (number == 3) {
    capacityOptions[0].disabled = false;
    capacityOptions[1].disabled = false;
    capacityOptions[2].disabled = false;
    if (selectedNumber == 3) {
      capacityOptions[0].selected = true;
    }
  } else {
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

// Функция очистки значений форм объявления
function clearValues() {
  yourHomeTitle.value = "";
  yourHomePrice.value = "";
  yourRoomNumberOptions[0].selected = true;
  yourHomeTypeOptions[0].selected = true;
  capacityOptions[2].selected = true;
  window.yourAdr.value = window.util.getCoords(draggablePin).left + ', ' + window.util.getCoords(draggablePin).top;
  yourDescription.value = " ";
}
