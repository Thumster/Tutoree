import React from 'react';
import {Button, Form, FormGroup, Label, Input, Jumbotron, Container, CustomInput } from 'reactstrap';
import {connect} from 'react-redux'
import {createPost} from '../store/actions/postActions'

class CreatePost extends React.Component {
    state = {
        category: '',
        title: '',
        description: '',
        price: '',
        location: '',
        subject: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(e.target.value);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(
            this.state.category + " "
            + this.state.title + " "
            + this.state.description + " "
            + this.state.price + " "
            + this.state.location + " "
            + this.state.subject
        )
        this.props.createPost(this.state)
    }

    render() {
        return (
            <Container>
                <Jumbotron>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <CustomInput type="radio" id="learnRadio" name="category" label="I want to learn!" value="learn" onChange={this.handleChange}/>
                            <CustomInput type="radio" id="teachRadio" name="category" label="I want to teach!" value="teach" onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input name="title" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input name="description" type="textarea" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input name="price" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="location">Location</Label>
                            <Input name="location" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="subject">Subject</Label>
                            <Input name="subject" onChange={this.handleChange} />
                        </FormGroup>
                        <Button type="submit">Submit</Button>
                    </Form>
                </Jumbotron>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (post) => dispatch(createPost(post))
    }
}
export default connect(null, mapDispatchToProps)(CreatePost)