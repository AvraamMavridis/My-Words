export default class TranslateService {
  static getTranslation(word) {
    const key = 'trnsl.1.1.20170211T150133Z.69c9469f807381ff.ef7292c52812701f41760ba677bad356fc48a8b1';
    const lang = 'en-el';
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${word}&lang=${lang}`;

    const myHeaders = new Headers();

    const options = {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default'
    };

    return fetch(url, options)
      .then(function (response) {
          return response.json();
      });
  }
}