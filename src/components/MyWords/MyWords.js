import React, { Component } from 'react';
import TopMenu from '../TopMenu/TopMenu';
import WordsTable from '../WordsTable/WordsTable';
import DBService from '../../services/DBService';
import styles from './MyWords.scss'

class MyWords extends Component {

  constructor(){
    super();
    this.state = {
      words: []
    }
  }

  async componentWillMount() {
    const data = await DBService.get();
    this.setState({ words: data.words });
  }

  render() {
    return (
      <span>
        <TopMenu />
        <div className={ styles.mainContainer }>
          <WordsTable words={ this.state.words } />
        </div>
      </span>
    );
  }
}

export default MyWords;