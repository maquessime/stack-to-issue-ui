/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './Hash.css';
import Issues from '../Issues'

@withStyles(styles)
class Hash extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  render() {
    const title = 'New User Registration';
    this.context.onSetTitle(title);
    return (
      <Issues issues={[]} hash="" issueLinks={[]} />
    );
  }

}

export default Hash;
