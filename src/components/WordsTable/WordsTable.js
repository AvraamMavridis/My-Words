import React, {Component, PropTypes} from 'react';
import { Table, Icon } from 'antd';
import styles from './WordsTable.scss';

const columns = [{
  title: 'Original',
  dataIndex: 'original',
  key: 'original',
}, {
  title: 'Translation',
  dataIndex: 'translation',
  key: 'translation',
}];

const pagination = {
  defaultPageSize: 5
}

class WordsTable extends Component {
  render() {
    return (
      <div className={ styles.tableContainer }>
        <Table columns={columns} dataSource={this.props.words} pagination={ pagination } />
      </div>
    );
  }
}



export default WordsTable;