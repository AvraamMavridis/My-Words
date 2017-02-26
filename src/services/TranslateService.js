import fetch from 'unfetch';
/**
 * Service Responsible for the translation
 *
 * @export
 * @class TranslateService
 */
export default class TranslateService {

  /**
   * Communicate with Yandex's API and translate a word
   *
   * @static
   * @param {string} word
   * @returns {promise}
   *
   * @memberOf TranslateService
   */
  static async getTranslation(word) {
    const key = 'trnsl.1.1.20170211T150133Z.69c9469f807381ff.ef7292c52812701f41760ba677bad356fc48a8b1';
    const lang = 'en-el';
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${ key }&text=${ word }&lang=${ lang }`;

    const myHeaders = new Headers();

    const options = {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default'
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
