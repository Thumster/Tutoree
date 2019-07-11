import React from 'react';
import SearchDropdown from './SearchDropdown/SearchDropdown'
import { Container, Row, Button, Col, Input} from 'reactstrap';
import './SearchBar.css'
import logo from './book_blue.png';

function SearchBar() {
    return (
        <div className="SearchBar">
            <Container className="center">
                <Row><img src={logo} className="logo" /></Row>
                <Row>
                    <Col xs="2" className="NoPadding"><SearchDropdown /></Col>
                    <Col xs="8" className="NoPadding"><Input style={{ width: "100%" }} /></Col>
                    <Col xs="2" className="NoPadding"><Button style={{ backgroundColor: "#326FA6", width: "100%" }}>Search</Button></Col>
                </Row>
            </Container>
        </div>
    );
}

export default SearchBar
        
