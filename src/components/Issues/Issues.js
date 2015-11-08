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
  	var issues = this.props.issues;
  	if(issues.length>0)
  	{
	    return (

	      	<ul>
	      	{issues.map(function(issue){
	      		return <li>{issue}</li>
	      	})}
	      	</ul>
	    );
	}
	return (<p>No issue has been found!</p>);
  }

}

export default Issues;
