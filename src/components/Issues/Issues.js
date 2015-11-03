/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component } from 'react';
import styles from './Issues.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class Issues extends Component {

  render() {
    return (
      <p>{this.props.issues}</p>
    );
  }

}

export default Issues;
