/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component,PropTypes } from 'react';
import styles from './Issues.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class Issues extends Component {

  static propTypes = {
    issues: PropTypes.array,
  };

  render() {
    return (
      	<ul>
      	{this.props.issues.map(function(issue){
      		return <li>{issue}</li>
      	})}
      	</ul>
    );
  }

}

export default Issues;
