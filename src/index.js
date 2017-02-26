import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

(async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('sw.js');
      registration.update();
    } catch (error) {
      throw Error('Error in service worker registration', error);
    }
  }
})();

ReactDOM.render(<App />, document.getElementById('root'));
