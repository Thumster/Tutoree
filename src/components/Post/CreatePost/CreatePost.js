import React from "react";
import {
  Button,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  Jumbotron,
  Container
} from "reactstrap";
import { connect } from "react-redux";
import { createPost } from "../../store/actions/postActions";
import {
  AvField,
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadio,
  AvRadioGroup
} from "availity-reactstrap-validation";
import Geosuggest from "react-geosuggest";
import "./geosuggest.css";

import styled from "styled-components";

const StyledHeader = styled.p`
  text-align: center;
  font-size: 2rem;
  font-weight: heavy;
`;

const StyledAvRadioGroup = styled(AvRadioGroup)`
  /* background-color: yellow; */
`;

const StyledAvRadio = styled(AvRadio)`
  /* background-color: yellow; */
`;

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  handleValidSubmit(event, values) {
    event.preventDefault();
    this.setState({ values });
    this.props.createPost(values);
    // this.props.history.push(`/Dashboard`);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isCreating && !this.props.isCreating) {
      this.props.history.push(`/Dashboard`);
    }
  }

  onSuggestSelect(place) {
    console.log(place);
  }

  render() {
    const GeoInput = (
      <Geosuggest placeholder="Enter your location" country="SG" />
    );
    return (
      <div>
        <Container>
          <Jumbotron>
            <StyledHeader>Post Details</StyledHeader>
            <AvForm onValidSubmit={this.handleValidSubmit}>
              <StyledAvRadioGroup
                name="category"
                label="Category"
                required
                errorMessage="*Please choose a category"
                inline
              >
                <StyledAvRadio
                  customInput
                  label="I want to learn!"
                  value="learn"
                />
                <StyledAvRadio
                  customInput
                  label="I want to teach!"
                  value="teach"
                />
              </StyledAvRadioGroup>
              <AvGroup>
                <Label for="title">Title</Label>
                <AvInput
                  name="title"
                  placeholder="Enter your post title here"
                  required
                />
                <AvFeedback>*Title is required</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="description">Description</Label>
                <AvInput
                  name="description"
                  id="exampleText"
                  type="textarea"
                  placeholder="Enter your post description here"
                  required
                />
                <AvFeedback>*Description is required</AvFeedback>
              </AvGroup>

              <AvGroup>
                <Label for="price">Price</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">S$</InputGroupAddon>
                  <AvInput
                    name="price"
                    type="number"
                    required
                    placeholder="Enter your price here"
                  />
                  <AvFeedback>*Enter a valid price</AvFeedback>
                </InputGroup>
              </AvGroup>

              <AvGroup>
                {/* <Label for="location">Location</Label>
                <AvInput
                  name="location"
                  required
                  placeholder="Enter your location here"
                />
                {GeoInput}
                <AvFeedback>*Location is required</AvFeedback> */}
                <Label for="location">Location</Label>
                <AvInput type="select" name="location" required>
                  <option value="" disabled selected hidden>
                    Select a location
                  </option>
                  <option>North</option>
                  <option>South</option>
                  <option>East</option>
                  <option>West</option>
                  <option>Central</option>
                  <option>Others</option>
                </AvInput>
                <AvFeedback>*Location is required</AvFeedback>
              </AvGroup>

              <AvGroup>
                <Label for="subject">Subject</Label>
                <AvInput type="select" name="subject" required>
                  <option value="" disabled selected hidden>
                    Select a subject
                  </option>
                  <option>English</option>
                  <option>Chinese</option>
                  <option>Math</option>
                  <option>Science</option>
                  <option>Others</option>
                </AvInput>
                <AvFeedback>*Subject is required</AvFeedback>
              </AvGroup>
              <Button type="submit">Submit</Button>
            </AvForm>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("STATE", state)
  return {
    isCreating: state.createPost.isCreating
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createPost: post => dispatch(createPost(post))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePost);
