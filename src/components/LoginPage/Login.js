import React from "react";
import SignIn from "./SignInBox/SignInBox";
import Catchphrase from "./Catchphrase/Catchphrase";
import teacherBackground from './Teacher-Classroom-Blog-Getty.jpg'

import styled from "styled-components";

const LoginDiv = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: space-around;
  background-image: url(${teacherBackground});
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  @media only screen and (max-width: 850px) {
    div.box{
      margin-top: 55px;
    }
  }
`;

function Login() {
  return (
    <LoginDiv>
      <Catchphrase />
      <SignIn />
    </LoginDiv>
  );
}

export default Login;
