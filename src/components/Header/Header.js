/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component } from 'react';
import styles from './Header.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import Navigation from '../Navigation';

@withStyles(styles)
class Header extends Component {

  render() {
    return (
      <div className="Header">
        <div className="Header-container">
          <div className="Header-banner">
            <h1 className="Header-bannerTitle">Stack-To-Issue</h1>
          </div>
        </div>
      </div>
    );
  }

}

export default Header;
