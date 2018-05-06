// Файл map.js — модуль, который позволяет управлять основным пином
'use strict';

window.yourAdr = document.getElementById('address');

(function () {

  // Задаем DOM объекты карты
  var mapObject = document.querySelector('.map');
  var mapPinsArea = mapObject.querySelector('.map__pins');

  var draggablePin = mapPinsArea.querySelector('.map__pin--main');
  window.STARTADRESS = window.util.getCoords(draggablePin);

  // Подставляем адрес в форму
  window.yourAdr.value = window.util.getCoords(draggablePin).left + ', ' + window.util.getCoords(draggablePin).top;

  // Слушаем клик миши по основному пину
  draggablePin.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();
    var mapPinsAll = mapPinsArea.querySelectorAll('.map__pin');
    window.activateMap(mapPinsAll);

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

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return false; // disable selection start (cursor change)
  });

  draggablePin.ondragstart = function () {
    return false;
  };

})();
