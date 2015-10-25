/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './ContentPage.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class ContentPage extends Component {

  static propTypes = {
    path: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  findStack(event){
    alert(event.target.elements.namedItem('issue').value);
    return false;
  };

  render() {
    this.context.onSetTitle(this.props.title);
    return (
      <div className="ContentPage">
        <div className="ContentPage-container">
          <label for="stack">Copy your stack here</label>
          <textarea id="stack" name="stack" form="stack_form" rows="20" cols="125"/>
          <span> Link this issue if not found : </span>
          <form id="stack_form" onSubmit={this.findStack}>
            <input type="text" name="issue" id="stack" />
            <div> 
              <button type="submit" form="stack_form">Send</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

}

export default ContentPage;
