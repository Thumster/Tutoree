import React from "react";
import book from "../../images/book_white.png";
// import user_photo from "./user_photo.png";
// import mail_icon from "./Mail-icon.png";

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
  Input
} from "reactstrap";
import { signOut } from "../store/actions/authActions";

import { MdMailOutline, MdCreate, MdAccountCircle } from "react-icons/md";

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
    console.log(profile);
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

                      <Col xs={4} className="NoPadding">
                        <SearchDropdown style={{ margin: "0px" }} />
                      </Col>
                      <Col xs={6} className="NoPadding">
                        <Input style={{ width: "100%", margin: "none" }} />
                      </Col>
                      <Col xs={2} className="NoPadding">
                        <Button
                          style={{
                            backgroundColor: "grey",
                            width: "100%",
                            margin: "0px"
                          }}
                        >
                          Search
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </NavItem>
              <NavItem className="icons">
                <NavLink href="/Mail">
                  <MdMailOutline fontSize="50px" color="#fff" />
                </NavLink>
              </NavItem>
              <NavItem className="icons">
                {
                  <NavLink href="/User">
                    <img src={profile.photoURL} className="navicon right" />
                  </NavLink>
                }
              </NavItem>
              <NavItem className="button-item icons">
                <Button color="primary" className="Button" href="/Dashboard">
                  Dashboard
                </Button>{" "}
              </NavItem>
              <NavItem className="button-item icons">
                <Button color="warning" className="Button" href="/CreatePost">
                  <MdCreate />
                  Post
                </Button>{" "}
              </NavItem>
              <NavItem className="button-item icons">
                <Button
                  color="danger"
                  className="Button"
                  onClick={() => this.props.signOut()}
                  href="/"
                >
                  Logout
                </Button>{" "}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
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
