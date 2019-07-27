import React from "react";
import book from "../../images/book_white.png";

import "./Nav.css";
import SearchDropdown from "../HomePage/SearchBar/SearchDropdown/SearchDropdown";
import { Form, Col, Row } from "reactstrap";
import { connect } from "react-redux";
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
  Media
} from "reactstrap";
import { signOut } from "../store/actions/authActions";

import { MdMailOutline, MdCreate, MdAccountCircle } from "react-icons/md";
import styled from "styled-components";

const StyledMailIcon = styled(MdMailOutline)`
  font-size: 45px;
  color: #fff;
  :hover {
    color: #d2d2d2;
    transform: scale(1.1);
    animation: wiggle 0.1s 7 alternate;
  }

  @keyframes wiggle {
    0% {
      transform: rotate(-2deg) scale(1.1);
    }
    100% {
      transform: rotate(2deg) scale(1.1);
    }
  }
`;

const StyledUserIcon = styled(Media)`
  transform: scale(1.2);
  vertical-align: middle;
  border-radius: 50%;
  :hover {
    transform: scale(1.4);
  }
`;

class NavSearched extends React.Component {
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
    const { profile } = this.props;
    const { uid } = this.props.auth;
    const userIcon = profile.photoURL ? (
      <StyledUserIcon src={profile.photoURL} className="navicon right" />
    ) : (
      <MdAccountCircle size={"2.5em"} />
    );

    return (
      <div>
        <Navbar style={{ backgroundColor: "#326FA6" }} light expand="lg">
          <NavbarBrand
            href="/Dashboard"
            style={{ fontFamily: "Calibri", color: "white", fontSize: "2em" }}
          >
            <img src={book} className="navicon" /> Tutoree
          </NavbarBrand>
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

                      {/* <Col xs={4} className="NoPadding">
                        <SearchDropdown style={{ margin: "0px" }} />
                      </Col>
                      <Col xs={6} className="NoPadding">
                        <Input style={{ width: "100%", margin: "none" }} />
                      </Col> */}
                      {/* <Col xs={2} className="NoPadding">
                        <Button
                          style={{
                            backgroundColor: "grey",
                            width: "100%",
                            margin: "0px"
                          }}
                        >
                          Search
                        </Button>
                      </Col> */}
                    </Row>
                  </Form>
                </div>
              </NavItem>
              <NavItem className="icons">
                <NavLink href="/Mail">
                  <StyledMailIcon />
                </NavLink>
              </NavItem>
              <NavItem className="icons">
                {<NavLink href={"/user/" + uid}>{userIcon}</NavLink>}
              </NavItem>
              <NavItem className="button-item icons">
                <Button color="success" className="Button" href="/Dashboard">
                  Dashboard
                </Button>
              </NavItem>
              <NavItem className="button-item icons">
                <Button color="warning" className="Button" href="/CreatePost">
                  <MdCreate />
                  Post
                </Button>
              </NavItem>
              <NavItem className="button-item icons">
                <Button
                  color="danger"
                  className="Button"
                  onClick={() => this.props.signOut()}
                  href="/"
                >
                  Logout
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavSearched);
// https://react-icons.netlify.com/#/
