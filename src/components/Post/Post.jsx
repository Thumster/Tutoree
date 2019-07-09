import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Jumbotron, Container, CustomInput} from 'reactstrap';

export default class Post extends React.Component {
    render() {
        return (
            <Container>
                <Jumbotron>
                    <Form>
                        <FormGroup>
                                <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="I want to learn!" />
                                <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="I want to teach!" />

                        </FormGroup>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="textarea" name="text" id="description" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input />
                        </FormGroup>
                        <FormGroup>
                            <Label for="location">Location</Label>
                            <Input />
                        </FormGroup>
                        <FormGroup>
                            <Label for="subject">Subject</Label>
                            <Input />
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
                </Jumbotron>
            </Container>
        );
    }
}