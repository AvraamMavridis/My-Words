import PouchDB from 'pouchdb';
const db = new PouchDB('translations');

export default class DBService {
  static async save(doc){
    try {
      const words = await db.get('words');
      return await db.put({ ...doc, _rev: words._rev });
    } catch (error) {
      if(error.status === 404 && error.message === 'missing'){
        return await db.put(doc);
      }
    }
  }

  static async get(){
    try {
      return await db.get('words');
    } catch (error) {
      return { words: []};
    }
  }
}