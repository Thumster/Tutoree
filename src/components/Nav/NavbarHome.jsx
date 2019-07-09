import React from 'react';
import book from "./book_white.png";
import user_photo from "./user_photo.png";
import mail_icon from "./Mail-icon.png";
import './Nav.css';
import firebase from 'firebase'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button } from 'reactstrap';

export default class NavbarHome extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar style={{backgroundColor: '#326FA6'}} light expand="md">
          <NavbarBrand href="/home" style={{fontFamily: 'Calibri', color: 'white', fontSize: '2em'}}><img src={book} className="navicon"/> Tutoree</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/mail"><img src={mail_icon} className="navicon right"/></NavLink>
              </NavItem>
              <NavItem>
                {/* <NavLink href="/user"><img src={user_photo} className="navicon right"/></NavLink> */}
                <NavLink href="/user"><img className="navicon right" src={firebase.auth().currentUser.photoURL}/></NavLink>
              </NavItem>
              <NavItem className="button-item">
              <Button color="secondary" className="Button" href="/Post">Post</Button>{' '}
              </NavItem>
              <NavItem className="button-item">
              <Button color="danger" className="Button" onClick={() => firebase.auth().signOut()} href="/">  Log Out</Button>{' '}
              </NavItem>
            </Nav>
            </Collapse>
        </Navbar>
      </div>
    );
  }
}