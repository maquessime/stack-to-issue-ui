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
    hash: PropTypes.string,
    issueLinks: PropTypes.array,
  };

  linkIssue(){
  	var issue=this.refs.issue.value;
  	this.refs.issue.value="";
  	var hash=this.refs.hash.value;
    var issues = this.addAndGetIssues(issue)
    var issueLinks=this.props.issueLinks
    request
     .post('/api/content/stacks/'+hash+'/issues')
     .set('Content-Type','application/json')
     .send('{"issues":["'+issue+'"]}')
     .end(function(err, res){
     	issueLinks.push(res.body.issue_link)
        React.render(<Issues issues={issues} hash={hash} issueLinks={issueLinks} />,document.getElementById("issues"));
    });
  }

  addAndGetIssues(issue){
  	var issues = this.props.issues;
    issues.push(issue);
    return issues;
  }

  render() {
  	var issues = this.props.issues;
  	var issueLinks=this.props.issueLinks;
    var addIssue = <div><ul><li>Link to an issue : </li>
<li><input type="text" ref="hash" size="74" value={this.props.hash}/></li>
    <li><input type="text" id="issue" ref="issue"/></li>
            <li><input type="button" value="Link" onClick={this.linkIssue}/>
</li>
            </ul>
            </div>;
  	if(issues.length>0)
  	{
	    return (
	    	<div>
		    	<h2>Issues</h2>
		      	<ul>
		      	{issues.map(function(issue,index){
		      		return <li><a target="_blank" href={issueLinks[index]}>{issue}</a></li>
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
