import store from 'store';

/**
 * DB/LocalStorage Service
 *
 * @export
 * @class DBService
 */
export default class DBService {
  /**
   * Save docs
   *
   * @static
   * @param {object} doc
   * @returns {promise}
   *
   * @memberOf DBService
   */
  static async save(doc) {
    try {
      store.set('words', doc);
      return Promise.resolve({ words: doc });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Return document
   *
   * @static
   * @returns {promise}
   *
   * @memberOf DBService
   */
  static async get() {
    try {
      const words = store.get('words');
      return Promise.resolve({ words: words || [] });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
