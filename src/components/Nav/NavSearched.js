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
import { IoIosLogOut } from "react-icons/io";
import { FiAirplay } from "react-icons/fi";
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
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;

const StyledDashboardButton = styled(Button)`
  width: 130px;
  :hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;

const StyledDashboardIcon = styled(FiAirplay)`
  font-size: 20px;
  position: relative;
  /* Adjust these values accordingly */
  top: -2px;
  right: 3px;
  ${StyledDashboardButton}:hover & {
    transform: scale(1.2);
  }
`;

const StyledEditButton = styled(Button)`
  width: 130px;
  :hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;

const StyledEditIcon = styled(MdCreate)`
  font-size: 20px;
  position: relative;
  /* Adjust these values accordingly */
  top: -2px;
  right: 1px;

  ${StyledEditButton}:hover & {
    transform: scale(1.2);
  }
`;

const StyledLogoutButton = styled(Button)`
  width: 130px;
  :hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;

const StyledLogoutIcon = styled(IoIosLogOut)`
  font-size: 20px;
  position: relative;
  /* Adjust these values accordingly */
  top: -2px;
  left: 5px;

  ${StyledLogoutButton}:hover & {
    transform: scale(1.2);
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
                <StyledDashboardButton
                  color="success"
                  className="Button"
                  href="/Dashboard"
                >
                  <StyledDashboardIcon />
                  Dashboard
                </StyledDashboardButton>
              </NavItem>
              <NavItem className="button-item icons">
                <StyledEditButton
                  color="warning"
                  className="Button"
                  href="/CreatePost"
                >
                  <StyledEditIcon />
                  Post
                </StyledEditButton>
              </NavItem>
              <NavItem className="button-item icons">
                <StyledLogoutButton
                  color="danger"
                  className="Button"
                  onClick={() => this.props.signOut()}
                >
                  Logout
                  <StyledLogoutIcon />
                </StyledLogoutButton>
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
