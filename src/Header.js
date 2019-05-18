import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import Icon from './Icon';
import './Header.css';

export default class Header extends Component {
  static propTypes = {
    user: PropTypes.shape({
      displayname: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired,
    onLogout: PropTypes.func.isRequired,
  };

  render() {
    const { user, onLogout } = this.props;
    const { displayname, type, mailbox } = user;
    return (
      <header>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Hi {displayname} <em>({mailbox})</em></NavbarBrand>
          <Nav className="ml-auto" navbar>
            {type === 'admin' && (
              <NavItem>
                <NavLink href="/admin">Admin</NavLink>
              </NavItem>
            )}
              <NavItem>
                <NavLink href="/addAlias">
                  <span title="Add Alias"><Icon icon="plus" /> Alias</span>
                </NavLink>
              </NavItem>
              <NavItem className="">
                <NavLink onClick={onLogout}>Logout</NavLink>
              </NavItem>
          </Nav>
        </Navbar>
      </header>
    );
  }
}
