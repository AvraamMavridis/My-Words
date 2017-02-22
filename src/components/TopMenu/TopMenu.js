import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './TopMenu.scss';

/**
 * Top Navigation Menu
 *
 * @class TopMenu
 * @extends {Component}
 */
class TopMenu extends Component {

  /**
   * Render the Top Menu
   *
   * @returns
   *
   * @memberOf TopMenu
   */
  render() {
    const current = window.location.pathname;

    return (
      <div
        className={ styles.topmenu }
        selectedKeys={ [ this.state.current ] }
        mode="horizontal">
        <Link to={ '/' }>
          <div className={ `${ styles.linkContainer } ${ current === '/' ? styles.selected : '' }` }>
            Home
          </div>
        </Link>
        <Link to={ '/mywords' }>
          <div className={ `${ styles.linkContainer } ${ current === '/mywords' ? styles.selected : '' }` }>
            Saved Words
          </div>
        </Link>
      </div>
    );
  }
}

export default TopMenu;
