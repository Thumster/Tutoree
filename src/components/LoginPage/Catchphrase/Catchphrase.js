import React from "react";

import styled from "styled-components";

const CatchPhraseDiv = styled.div`
  height: 50%;
  width: 40%;
  min-width: 300px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  padding-left: 10%;
  font-size: calc(10px + 2vmin);
  color: #326fa6;
  font-family: Calibri;
  font-style: italic;
  text-align: left;
`;

const HeaderP = styled.p`
  font-weight: 700;
`;

const FooterP = styled.p`
  color: black;
  font-family: Century Gothic;
  font-style: normal;
  text-align: center;
  font-weight: bold;
`;

class Catchphrase extends React.Component {
  render() {
    return (
      <CatchPhraseDiv>
          <HeaderP> SINGAPORE'S GO-TO TUITION MARKETPLACE </HeaderP>
          <p> Connect with tutors and tutees around the country </p>
          <p>
            <ul>
              <li>Hassle-free</li>
              <li>Free Sign-up</li>
              <li>Diverse Range of Subjects</li>
            </ul>
          </p>
        <FooterP>
          What are you waiting for? <br /> Sign-up now!
        </FooterP>
      </CatchPhraseDiv>
    );
  }
}

export default Catchphrase;
