import React, { Component } from 'react';
import uniqBy from 'lodash.uniqby';
import Button from '../Button/Button';
import TranslateService from '../../services/TranslateService';
import DBService from '../../services/DBService';
import WordsTable from '../WordsTable/WordsTable';
import NetworkService from '../../services/NetworkService';
import TopMenu from '../TopMenu/TopMenu';
import styles from './MainForm.scss';

/**
 * Main Form Component
 *
 * @export
 * @class MainForm
 * @extends {Component}
 */
export default class MainForm extends Component {

  /**
   * Creates an instance of MainForm.
   *
   * @memberOf MainForm
   */
  constructor() {
    super();
    this.state = {
      word: '',
      words: [],
      isOnline: true
    };

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  /**
   * Translate the input
   *
   * @memberOf MainForm
   */
  async translateInput() {
    if (!this.state.word) return;
    const wordToSave = this.state.word.split('').map((c, i) => i === 0 ? c.toUpperCase() : c).join('');
    let translation;
    try {
      const data = await TranslateService.getTranslation(wordToSave);
      translation = data.text[0];
    } catch (error) {
      translation = '-';
    } finally {
      this.state.words.push({ original: wordToSave, translation });
      this.setState({ words: this.state.words, word: '' });

      // Save words to db
      const data = await DBService.get();
      let words = this.state.words.filter(w => w.translation !== '-');
      words = uniqBy(words.concat(data.words), 'original');
      DBService.save(words);
    }
  }

  /**
   * Set state on input change
   *
   * @param {object} e
   *
   * @memberOf MainForm
   */
  onChangeHandler(e) {
    this.setState({ word: e.nativeEvent.target.value });
  }

  /**
   * On ENTER press translate input
   *
   * @param {object} e
   *
   * @memberOf MainForm
   */
  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.translateInput();
    }
  }

  /**
   * On click translate input
   *
   *
   * @memberOf MainForm
   */
  onClickHandler() {
    this.translateInput();
  }

  /**
   * Render MainForm
   *
   * @returns {JSX}
   *
   * @memberOf MainForm
   */
  /**
   * Listen to network connection changes
   * onMount and update the state
   *
   * @memberOf MainForm
   */
  async componentDidMount() {
    NetworkService.subscribe(isOnline => {
      if (this.state.isOnline !== isOnline) {
        this.setState({ isOnline });
      }
    });
  }

  /**
   * On connectivity status change update the words
   * that have not been translate
   *
   * @param {object} nextProps
   * @param {object} nextState
   *
   * @memberOf MainForm
   */
  async componentWillUpdate(nextProps, nextState) {
    if (!this.state.isOnline && nextState.isOnline) {
      const wordsToTranslate = this.state.words.filter(w => w.translation === '-');
      const promises = wordsToTranslate.map(w => TranslateService.getTranslation(w.original));
      const data = await Promise.all(promises);
      wordsToTranslate.forEach((w, i) => {
        w.translation = data[i].text[0];
      });
      // Translate pending words when the user goes online
      let newWords = this.state.words.filter(w => w.translation !== '-');
      newWords = newWords.concat(wordsToTranslate);
      newWords = uniqBy(newWords, 'original');
      this.setState({ words: newWords });

      // Save them to DB
      let wordsToSave = this.state.words.filter(w => w.translation !== '-');
      wordsToSave = uniqBy(wordsToSave.concat(newWords), 'original');
      DBService.save(wordsToSave);
    }
  }

  /**
   * Render Main Form
   *
   * @returns {JSX}
   *
   * @memberOf MainForm
   */
  render() {
    return (
      <div className="col-md-12">
        <TopMenu />
        <div className={ styles.mainContainer }>
          <div className={ styles.form } action="">
            <div className={ styles.inputContainer }>
              <input
                onKeyPress={ e => this.onKeyPress(e) }
                onChange={ e => this.onChangeHandler(e) }
                value={ this.state.word } />
              <Button onClick={ () => this.onClickHandler() } text="Add" />
            </div>
            <WordsTable words={ this.state.words } />
          </div>
        </div>
      </div>
    );
  }
}
