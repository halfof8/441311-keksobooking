// Файл activation.js
'use strict';

(function () {
    var mapObject = document.querySelector('.map');
    var adFormNotice = document.querySelector('.ad-form');
    var mapPinsArea = mapObject.querySelector('.map__pins');
    var yourNotice = document.querySelector('.notice');
    var fieldsNotice = yourNotice.querySelectorAll('fieldset');
    var draggablePin = mapPinsArea.querySelector('.map__pin--main');

    // Функция активации карты
    window.activateMap = function (mapPinsAll) {

        mapObject.classList.remove('map--faded');
        adFormNotice.classList.remove('ad-form--disabled');
        mapPinsArea.classList.remove('map--faded');

        for (var i = 0; i < fieldsNotice.length; i++) {
            fieldsNotice[i].disabled = false;
        }

        for (var i = 1; i < mapPinsAll.length; i++) {
            mapPinsAll[i].classList.remove('hidden');
        }

    };

    // Функция деактивации
    window.deactivateMap = function (mapPinsAll) {

        mapObject.classList.add('map--faded');
        adFormNotice.classList.add('ad-form--disabled');
        mapPinsArea.classList.add('map--faded');

        for (var i = 0; i < fieldsNotice.length; i++) {
            fieldsNotice[i].disabled = true;
        }

        draggablePin.style = "left: " + window.STARTADRESS.left + 'px; top: ' + window.STARTADRESS.top + "px;";

        // Подставляем адрес в форму
        window.yourAdr.value = window.util.getCoords(draggablePin).left + ', ' + window.util.getCoords(draggablePin).top;
       
        for (var i = 1; i < mapPinsAll.length; i++) {
            mapPinsAll[i].classList.add('hidden');
        }

        if (mapObject.querySelector('.map__card')) {
            mapObject.querySelector('.map__card').remove();
        }
    };


})()