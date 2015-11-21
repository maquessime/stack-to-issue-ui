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
    const title = 'Got Hash?';
    this.context.onSetTitle(title);
    return (
      <div className="HashPage">
        <div className="HashPage-container">
          <Issues issues={[]} hash="" issueLinks={[]} />
        </div>
      </div>
    );
  }

}

export default Hash;
