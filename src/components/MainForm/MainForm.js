import React, {Component} from 'react';
import {Form, Icon, Input, Button} from 'antd';
import TranslateService from '../../services/TranslateService';
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

  onChangeHandler(e){
    this.setState({ word: e.nativeEvent.target.value });
  }

  onClickHandler() {
    TranslateService.getTranslation(this.state.word)
      .then((data) => {
        this.state.words.push({ original: this.state.word, translation: data.text[0] });
        this.setState({ words: this.state.words.slice(), word: '' } );
      })
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
