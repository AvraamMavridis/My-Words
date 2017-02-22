import React, { Component } from 'react';
import TopMenu from '../TopMenu/TopMenu';
import WordsTable from '../WordsTable/WordsTable';
import DBService from '../../services/DBService';
import styles from './MyWords.scss';

/**
 * MyWords Component
 * Displays the saved words
 *
 * @class MyWords
 * @extends {Component}
 */
export default class MyWords extends Component {

  /**
   * Creates an instance of MyWords.
   *
   * @memberOf MyWords
   */
  constructor() {
    super();
    this.state = {
      words: []
    };
  }

  /**
   * Retrieve words on mounting and set
   * the initial state
   *
   * @memberOf MyWords
   */
  async componentWillMount() {
    const data = await DBService.get();
    this.setState({ words: data.words });
  }

  /**
   * Renders MyWords component
   *
   * @returns {JSX}
   *
   * @memberOf MyWords
   */
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
