import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'whatwg-fetch';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(registration => {
      registration.update()
    })
    .catch(error => {
      console.error('Error in service worker registration', error);
    })
}

ReactDOM.render(<App />, document.getElementById('root'));
