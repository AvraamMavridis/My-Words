import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import MainForm from './components/MainForm/MainForm';
import MyWords from './components/MyWords/MyWords';
import './App.scss';

/**
 * Root App Component
 *
 * @export
 * @class App
 * @extends {Component}
 */
export default class App extends Component {

  /**
   * Render App
   *
   * @returns {JSX}
   *
   * @memberOf App
   */
  render() {
    return (
      <Router history={ browserHistory }>
        <Route path="/" component={ MainForm } />
        <Route path="/mywords" component={ MyWords } />
      </Router>
    );
  }
}
