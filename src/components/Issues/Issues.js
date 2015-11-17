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
  	this.refs.issue.value="";
  	var hash=this.refs.hash.value;
    var issues = this.addAndGetIssues(issue)
    request
     .post('/api/content/stacks/'+hash+'/issues')
     .set('Content-Type','application/json')
     .send('{"issues":["'+issue+'"]}')
     .end(function(err, res){
        React.render(<Issues issues={issues} hash={hash} />,document.getElementById("issues"));
    });
  }

  addAndGetIssues(issue){
  	var issues = this.props.issues;
    issues.push(issue);
    return issues;
  }

  render() {
  	var issues = this.props.issues;
    var addIssue = <div><span>Link to an issue : </span><input type="text" id="issue" ref="issue"/>
      <input type="hidden" ref="hash" value={this.props.hash}/>
            <input type="button" value="Link" onClick={this.linkIssue}/></div>;
  	if(issues.length>0)
  	{
	    return (
	    	<div>
		    	<h2>Issues</h2>
		      	<ul>
		      	{issues.map(function(issue){
		      		return <li>{issue}</li>
		      	})}
		      	</ul>
            {addIssue}
		    </div>
	    );
	}
	return (
		
		<div>
			<h2>Issues</h2>
			<p>No issue has been found!</p> 
			{addIssue}
    </div>
		);
  }

}

export default Issues;
