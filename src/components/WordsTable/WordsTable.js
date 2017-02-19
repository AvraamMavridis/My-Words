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

class WordsTable extends Component {

  constructor(){
    super();
    this.state = {
      defaultPageSize: Math.ceil((window.innerHeight - 300) / 50),
      pageSize: Math.ceil((window.innerHeight - 300) / 50)
    }
    this.setPagination = this.setPagination.bind(this);
  }

  setPagination(){
    this.setState({ pageSize: Math.ceil((window.innerHeight - 300) / 50) });
  }

  componentDidMount() {
    window.addEventListener('resize', this.setPagination);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setPagination);
  }

  render() {
    const words = this.props.words.map((word, i) => ({ ...word, key: i}));

    const pagination = {
      defaultPageSize: this.state.defaultPageSize,
      pageSize: this.state.pageSize > 0 ? this.state.pageSize : 1
    }

    return (
      <div className={ styles.tableContainer }>
        <Table columns={columns} dataSource={words} pagination={ pagination } />
      </div>
    );
  }
}



export default WordsTable;