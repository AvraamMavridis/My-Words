import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'whatwg-fetch';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
}

ReactDOM.render(<App />, document.getElementById('root'));
