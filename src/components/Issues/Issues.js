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
    if(issue==""){
      return;
    }
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

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
  	var issues = this.props.issues;
  	var issueLinks=this.props.issueLinks;
    var hash = this.props.hash;
    var addIssue = <div>
      <h3>Link to an issue :</h3>
      <span for="hash">Hash : </span><input type="text" id="hash" ref="hash" size="74" onChange={this.handleChange} value={hash}/><br/>
      <span>Issue : </span><input type="text" id="issue" ref="issue"/><br/>
      <input type="button" value="Add" onClick={this.linkIssue}/>
    </div>;
  	var issuesSection = this.resolveIssuesSection(issues,issueLinks);
  	if(!hash.length)
  	{
  		return (<div>{addIssue}</div>);
  	}
  	return (
  		
  		<div>
  			{issuesSection}
  			{addIssue}
      </div>
  		);
    }

  resolveIssuesSection(issues,issueLinks){
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
        </div>
      );
    }
    return (
      <div>
        <h2>Issues</h2>
        <p>No issue has been found!</p> 
      </div>
      );
  }

}

export default Issues;
