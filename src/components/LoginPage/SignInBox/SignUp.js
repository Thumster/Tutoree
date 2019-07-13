import React from 'react';
import { Button, Form, FormGroup, Popover, PopoverHeader, PopoverBody, Label, Input } from 'reactstrap';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    return (
      <span>
        <a id="Popover1" style={{cursor:"pointer", color:"#007bff"}}>
          Sign Up!
        </a>
        <Popover placement="top" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
          <PopoverHeader>Sign Up</PopoverHeader>
          <PopoverBody>
              <Form>
              <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="example@abc.com" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="Enter password" />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input type="password" name="password" id="confirmPassword" placeholder="Enter password again" />
        </FormGroup>
        <Button>Submit</Button>

 
              </Form>
          </PopoverBody>
        </Popover>
        </span>
    );
  }
}