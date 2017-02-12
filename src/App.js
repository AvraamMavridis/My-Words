import React, {Component} from 'react';
import MainForm from './components/MainForm/MainForm';
import TopMenu from './components/TopMenu/TopMenu';
import './App.scss';

export default class App extends Component {

  render() {
    return (
      <span>
      <TopMenu />
      <MainForm />
      </span>
    );
  }
}
