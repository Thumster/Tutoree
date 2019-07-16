import React from 'react';
import { Button, Form, FormGroup, Label, Input, Jumbotron, Container, CustomInput } from 'reactstrap';
import { connect } from 'react-redux'
import { createPost } from '../store/actions/postActions'
import NavSearched from '../Nav/NavSearched';
import { AvForm, AvGroup, AvInput, AvFeedback, AvRadio, AvRadioGroup } from 'availity-reactstrap-validation';

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: '',
            title: '',
            description: '',
            price: '',
            location: '',
            subject: '',
        }
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     this.props.createPost(this.state);
    //     this.props.history.push(`/Dashboard`);
    // }

    handleValidSubmit(event, values) {
        this.setState({ values });
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <NavSearched />
                <Container>

                    <Jumbotron>
                        <p style={{ textAlign: "center", fontSize: "2rem", fontWeight: "heavy" }}>Post Details</p>
                        <AvForm onValidSubmit={this.handleValidSubmit}>

                            <AvRadioGroup name="category" label="Category" required errorMessage="*Please choose a category">
                                <AvRadio customInput label="I want to learn!" value="learn" />
                                <AvRadio customInput label="I want to teach!" value="teach" />
                            </AvRadioGroup>
                            <AvGroup>
                                <Label for="title">Title</Label>
                                <AvInput name="title" placeholder="Enter your post title here" required/>
                                <AvFeedback>*Title is required</AvFeedback>
                            </AvGroup>
                            <AvGroup>
                                <Label for="description">Description</Label>
                                <AvInput name="description" type="textarea" placeholder="Enter your post description here" required/>
                                <AvFeedback>*Description is required</AvFeedback>
                            </AvGroup>


                            <AvGroup>
                                <Label for="price">Price</Label>
                                <Label for="price">S$</Label>
                                <AvInput name="price" required placeholder="Enter your price here"/>
                                <AvFeedback>*Price is required</AvFeedback>
                            </AvGroup>
                            <FormGroup>
                                <Label for="location">Location</Label>
                                <Input name="location" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="subject">Subject</Label>
                                <Input name="subject" onChange={this.handleChange} />
                            </FormGroup>
                            <Button type="submit">Submit</Button>
                        </AvForm>
                    </Jumbotron>
                </Container>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (post) => dispatch(createPost(post))
    }
}
export default connect(null, mapDispatchToProps)(CreatePost)