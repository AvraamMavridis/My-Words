import React from 'react';
import styles from './Button.scss';

export default props => {
  return (<button onClick={ e => props.onClick(e) } className={ styles.button }>{ props.text }</button>);
};
