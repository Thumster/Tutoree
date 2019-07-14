import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleSubmit = e => {
        e.preventDefault();
        this.toggle();
    };

    render() {
        return (
            <span>
                <a id="Popover1" onClick={this.toggle} style={{ cursor: "pointer", color: "#007bff" }}>
                    Sign Up!
                </a>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} centered>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalHeader toggle={this.toggle}>SIGN UP</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="exampleName">Name</Label>
                                <Input type="name" name="name" id="exampleName" placeholder="Enter name" />
                            </FormGroup>
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

                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="primary" > Submit</Button>
                        </ModalFooter>
                    </Form>
                </Modal>

            </span >
        );
    }
}

export default ModalExample;