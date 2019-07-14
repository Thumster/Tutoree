import React from 'react';
import book from "./book_white.png";
import user_photo from "./user_photo.png";
import mail_icon from "./Mail-icon.png";
import './Nav.css';
import firebase from 'firebase';
import SearchDropdown from '../HomePage/SearchBar/SearchDropdown/SearchDropdown';
import { Form, Col, Row } from 'reactstrap'

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
                <Navbar style={{ backgroundColor: '#326FA6' }} light expand="lg">
                    <NavbarBrand href="/Dashboard" style={{ fontFamily: 'Calibri', color: 'white', fontSize: '2em' }}><img src={book} className="navicon" /> Tutoree</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem className="search">
                                <div className="container">
                                    <Form>
                                        <Row form>
                                            {/* <div className="col-3 w-100">
                                            <Dropdown style={{margin: "auto"}}l/>
                                        </div>
                                        <div className="col-9 ">
                                            <div className="row"> */}

                                            <Col xs={4} className="NoPadding">
                                                <SearchDropdown style={{ margin: "0px" }} />
                                            </Col>
                                            <Col xs={6} className="NoPadding">
                                                <Input style={{ width: "100%", margin: "none" }} />
                                            </Col>
                                            <Col xs={2} className="NoPadding">
                                                <Button style={{ backgroundColor: "grey", width: "100%", margin: "0px" }}>Search</Button>
                                            </Col>


                                            {/* <InputGroup>
                                                <Input style={{margin: "auto"}}/>
                                                <InputGroupAddon addonType="append">
                                                    <Button color="secondary">Search</Button>
                                                </InputGroupAddon>
                                            </InputGroup> */}
                                        </Row>
                                    </Form>
                                </div>
                            </NavItem>
                            <NavItem className="icons">
                                <NavLink href="/Mail"><img src={mail_icon} className="navicon right" /></NavLink>
                            </NavItem>
                            <NavItem className="icons">
                                {<NavLink href="/User"><img src={user_photo} className="navicon right" /></NavLink>}
                                {/*<NavLink href="/user"><img className="navicon right" alt="profile picture" src={firebase.auth().currentUser.photoURL}/></NavLink>*/}
                            </NavItem>
                            <NavItem className="button-item icons">
                                <Button color="primary" className="Button" href="/Dashboard">Dashboard</Button>{' '}
                            </NavItem>
                            <NavItem className="button-item icons">
                                <Button color="secondary" className="Button" href="/CreatePost">Post</Button>{' '}
                            </NavItem>
                            <NavItem className="button-item icons">
                                <Button color="danger" className="Button" onClick={() => firebase.auth().signOut()} href="/">Logout</Button>{' '}
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}