// Файл util.js
'use strict';

window.util = (function () {

  return {
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    ammendString: function (array) {
      var amount = window.util.getRandomInt(1, array.length - 1);
      var resultString = '';

      for (var i = 0; i <= amount; i++) {
        resultString += array[i];
        if (i < amount) {
          resultString += ', ';
        }
      }
      return resultString;
    },
    shuffleArray: function (array) {
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
    },
    getCoords: function (elem) {
      var box = elem.getBoundingClientRect();
      return {
        top: elem.offsetTop,
        left: elem.offsetLeft
      };
    },
    getPosition: function (elem) {
      var box = elem.getBoundingClientRect();
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
    }
  };

})();
