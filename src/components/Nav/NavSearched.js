import React from 'react';
import book from "./book_white.png";
import user_photo from "./user_photo.png";
import mail_icon from "./Mail-icon.png";
import './Nav.css';
import firebase from 'firebase';
import Dropdown from './Dropdown';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button,
    Input,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';

export default class NavSearched extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
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
                <Navbar style={{ backgroundColor: '#326FA6' }} light expand="md">
                    <NavbarBrand href="/home" style={{ fontFamily: 'Calibri', color: 'white', fontSize: '2em' }}><img src={book} className="navicon" /> Tutoree</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem className="search">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-3">
                                            <Dropdown/>
                                        </div>
                                        <div className="col-9">
                                <InputGroup>
                                    <Input />
                                    <InputGroupAddon addonType="append">
                                        <Button color="secondary">Search</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                                </div>
                                </div>
                                </div>
                            </NavItem>
                            <NavItem className="icons"> 
                                <NavLink href="/Mail"><img src={mail_icon} className="navicon right" /></NavLink>
                            </NavItem>
                            <NavItem className="icons">
                                {<NavLink href="/User"><img src={user_photo} className="navicon right" /></NavLink>}
                                {/*<NavLink href="/user"><img className="navicon right" alt="profile picture" src={firebase.auth().currentUser.photoURL}/></NavLink>*/}
                            </NavItem>
                            <NavItem className="button-item">
                                <Button color="primary" className="Button" href="/Dashboard">Dashboard</Button>{' '}
                            </NavItem>
                            <NavItem className="button-item">
                                <Button color="secondary" className="Button" href="/CreatePost">Post</Button>{' '}
                            </NavItem>
                            <NavItem className="button-item">
                                <Button color="danger" className="Button" onClick={() => firebase.auth().signOut()} href="/">Logout</Button>{' '}
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}