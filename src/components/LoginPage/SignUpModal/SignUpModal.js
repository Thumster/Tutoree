import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label
} from "reactstrap";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback
} from "availity-reactstrap-validation";
import book from "../../../images/book_white.png";

import styled from "styled-components";

const SignUpBook = styled.img`
  margin-bottom: 5px;
  margin-right: 5px;
  height: 15%;
  height: 1em;
`;

const StyledModalHeader = styled(ModalHeader)`
  color: white;
  padding: 9px 15px;
  border-bottom: 1px solid #eee;
  background-color: #326fa6;
  -webkit-border-top-left-radius: 5px;
  -webkit-border-top-right-radius: 5px;
  -moz-border-radius-topleft: 5px;
  -moz-border-radius-topright: 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const StyledError = styled.div`
  color: red;
  text-align: center;
  font-weight: bold;
  ${({ active }) =>
    !active &&
    `
    display: none;
  `}
`;

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleValidSubmit(event, values) {
    event.preventDefault();
    this.setState({ values });
    this.props.signUp(values);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const { signUpError } = this.props;

    return (
      <span>
        <a
          onClick={this.toggle}
          style={{ cursor: "pointer", color: "#007bff" }}
        >
          Sign Up!
        </a>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          centered
        >
          <AvForm onValidSubmit={this.handleValidSubmit}>
            <StyledModalHeader toggle={this.toggle}>
              <SignUpBook src={book} />
              SIGN UP
            </StyledModalHeader>
            <ModalBody>
              <AvGroup>
                <Label for="exampleName">Name</Label>
                <AvInput name="name" placeholder="Enter name" required />
                <AvFeedback>
                  Name cannot be empty. Please fill in a name.
                </AvFeedback>
              </AvGroup>

              <AvGroup>
                <Label for="exampleEmail">Email</Label>
                <AvInput
                  type="email"
                  name="email"
                  placeholder="example@abc.com"
                  required
                />
                <AvFeedback>Email invalid.</AvFeedback>
              </AvGroup>

              <AvGroup>
                <Label for="examplePassword">Password</Label>
                <AvInput
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                />
                <AvFeedback>
                  Password cannot be empty. Please fill in a password.
                </AvFeedback>
              </AvGroup>

              <AvGroup>
                <Label for="confirmPassword">Confirm Password</Label>
                <AvInput
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter password again"
                  required
                  validate={{ match: { value: "password" } }}
                />
                <AvFeedback>
                  Passwords do not match. Please try again.
                </AvFeedback>
              </AvGroup>
              <StyledError
                class="form-control-static pull-left"
                active={signUpError}
              >
                Error: {signUpError}
              </StyledError>
              {/* //  */}
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </ModalFooter>
          </AvForm>
        </Modal>
      </span>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    signUpError: state.auth.signUpError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalExample);
