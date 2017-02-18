import React, {Component} from 'react';
import MainForm from './components/MainForm/MainForm';
import MyWords from './components/MyWords/MyWords';
import { Router, Route, browserHistory } from 'react-router';
import './App.scss';

export default class App extends Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={MainForm}></Route>
        <Route path="/mywords" component={MyWords}/>
      </Router>
    );
  }
}
