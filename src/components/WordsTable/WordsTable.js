import React, { Component } from 'react';

/**
 * Table Component
 *
 * @class WordsTable
 * @extends {Component}
 */
export default class WordsTable extends Component {

  /**
   * Creates an instance of WordsTable.
   *
   * @memberOf WordsTable
   */
  constructor() {
    super();
    this.state = {
      defaultPageSize: Math.ceil((window.innerHeight - 300) / 50),
      pageSize: Math.ceil((window.innerHeight - 300) / 50)
    };
    this.setPagination = this.setPagination.bind(this);
  }

  /**
   * Sets the pagination based on the viewport height
   *
   *
   * @memberOf WordsTable
   */
  setPagination() {
    this.setState({ pageSize: Math.ceil((window.innerHeight - 300) / 50) });
  }

  /**
   * Attach listeners when the component is mounted
   *
   * @memberOf WordsTable
   */
  componentDidMount() {
    window.addEventListener('resize', this.setPagination);
  }

  /**
   * Removes listeners when the component unmount
   *
   * @memberOf WordsTable
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.setPagination);
  }

  /**
   * Render WordTable component
   *
   * @returns {JSX}
   *
   * @memberOf WordsTable
   */
  render() {
    const words = this.props.words.map((word, i) => ({ ...word, key: i }));

    return (
      <div className="col-md-12">
        <table className="col-md-12">
          <tr>
            <th>Original</th>
            <th>Translation</th>
          </tr>
          { words.map(word => {
            return (
              <tr>
                <td>{word.original}</td>
                <td>{word.translation}</td>
              </tr>
            );
          }) }
        </table>
      </div>
    );
  }
}
