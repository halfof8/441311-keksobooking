// Файл similar.js - получаем  данные и апдейтим
'use strict';

(function () {
  var listings = [];
  var mapPinsArea = document.querySelector('.map__pins');
  
  function successHandler (data) {
    listings = data;
    updatePins();
  };
  
  function errorHandler (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage; 
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function updatePins () {
    window.addPins(listings);
  }

  window.backend.load(successHandler, errorHandler);

})();