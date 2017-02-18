import React, {Component} from 'react';
import {Form, Icon, Input, Button} from 'antd';
import TranslateService from '../../services/TranslateService';
import DBService from '../../services/DBService';
import WordsTable from '../WordsTable/WordsTable';
const FormItem = Form.Item;
import styles from './MainForm.scss';

export default class MainForm extends Component {

  constructor(){
    super();
    this.state = {
      word: '',
      words: []
    }
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }


  async componentWillMount() {
    try {
      const wordsDoc = await DBService.get();
      this.setState({ words: wordsDoc.words });
    } catch (error) {
      console.error(error);
    }
  }

  onChangeHandler(e){
    this.setState({ word: e.nativeEvent.target.value });
  }

  async onClickHandler() {
    const data = await TranslateService.getTranslation(this.state.word)
    this.state.words.push({ original: this.state.word, translation: data.text[0] });
    this.setState({ words: this.state.words.slice(), word: '' } );

    const save = await DBService.save({ _id: 'words', words: this.state.words.slice() });
  }

  render() {
    return (
      <div className={ styles.mainContainer }>
      <Form className={ styles.form } inline onSubmit={this.handleSubmit}>
        <div className={ styles.inputContainer }>
          <Input onChange={ this.onChangeHandler } value={ this.state.word } />
          <Button onClick={ this.onClickHandler }>Add</Button>
        </div>
        <WordsTable words={ this.state.words } />
      </Form>
      </div>
    );
  }
}
