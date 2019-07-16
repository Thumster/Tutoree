import React from "react";
import logo from "./book_blue.png";
import LoginButtons from "./LoginButtons";
import Modal from "../SignUpModal/SignUpModal";
import { connect } from "react-redux";

import styled from "styled-components";

const BoxDiv = styled.div`
  background: #ffffff;
  border-style: solid;
  border-color: #326fa6;
  border-radius: 20px;
  text-align: center;
  min-width: 500px;
  font-family: Calibri;
  height: 500px;
  margin: auto;
  position: relative;
`;

const BookLogo = styled.img`
  margin-top: 30px;
  height: 15%;
`;

const LogoHeader = styled.h1`
  font-family: "High Tower Text";
  font-size: 2.5em;
  color: #326fa6;
`;

const FooterDiv = styled.div`
  position: absolute;
  bottom: 0;
  background: darkgrey;
  width: 100%;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border: 1px solid #326fa6;
  border-top: none;
`;

const SignUpP = styled.p`
  margin: auto;
  color: white;
`;

const SignIn = props => {
  const { auth } = props;

  return (
    <BoxDiv>
      <BookLogo src={logo} />
      <LogoHeader>Tutoree</LogoHeader>
      <LoginButtons />
      {!auth.uid ? (
        <FooterDiv>
          <SignUpP>
            Do not have an account? <Modal />
          </SignUpP>
        </FooterDiv>
      ) : null}
    </BoxDiv>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(SignIn);
