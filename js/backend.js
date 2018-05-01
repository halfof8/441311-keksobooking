// Файл backend.js - основные функции получения и отправки данных
'use strict';

window.backend = (function () {

  return {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000; // 10s

      xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
      xhr.send();
    },

    save: function (data, onSave, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';


      xhr.addEventListener('load', function () {
        onSave(xhr.response);
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000; // 10s


      console.log(data);
      xhr.open('POST', 'https://js.dump.academy/keksobooking');
      xhr.send(data);
    }
  }
})();

