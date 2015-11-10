/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component,PropTypes } from 'react';
import styles from './Issues.css';
import withStyles from '../../decorators/withStyles';
import request from 'superagent';

@withStyles(styles)
class Issues extends Component {

  constructor(props){
    super(props);
    this.linkIssue=this.linkIssue.bind(this);
  }	

  static propTypes = {
    issues: PropTypes.array,
    hash: PropTypes.string
  };

  linkIssue(){
  	var issue=this.refs.issue.value;
  	var hash=this.refs.hash.value;
    request
     .post('/api/content/stacks/'+hash+'/issues')
     .set('Content-Type','application/json')
     .send('{"issues":["'+issue+'"]}')
     .end(function(err, res){
        React.render(<Issues issues={[res.body.issues]} hash={res.body.hash} />,document.getElementById("issues"));
    });
  }

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
	return (
		
		<div>
			<p>No issue has been found!</p> 
			<span>Link to an issue : </span><input type="text" id="issue" ref="issue"/>
			<input type="hidden" ref="hash" value={this.props.hash}/>
            <input type="button" value="Link" onClick={this.linkIssue}/>
        </div>
		);
  }

}

export default Issues;
