/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './ContentPage.css';
import withStyles from '../../decorators/withStyles';
import request from 'superagent';

@withStyles(styles)
class ContentPage extends Component {

  constructor(props){
    super(props);
    this.findStack=this.findStack.bind(this);
  }

  static propTypes = {
    path: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  findStack(){
    var stack=this.refs.stack.value;
    var issue=this.refs.issue.value;
    request
     .post('/api/content')
     .send(stack)
     .set('Accept', 'application/json')
     .end(function(err, res){
       alert(res.body)
    });
  };

  render() {
    
    this.context.onSetTitle(this.props.title);
    return (
      <div className="ContentPage">
        <div className="ContentPage-container">
          <label for="stack">Copy your stack here</label>
          <textarea ref="stack" id="stack" name="stack" form="stack_form" rows="20" cols="125"/>
          <span> Link this issue if not found : </span>
            <input type="text" name="issue" id="issue" ref="issue" />
            <div> 
              <input type="button" value="Send" onClick={this.findStack}/>
            </div>
        </div>
      </div>
    );
  }

}

export default ContentPage;
