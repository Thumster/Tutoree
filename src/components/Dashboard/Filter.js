import React, { Component } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import { connect } from "react-redux";
import {
  categoryCheckboxChange,
  subjectCheckboxChange,
  locationCheckboxChange,
  sortButtonChange
} from "../store/actions/filterActions";
import { TiArrowDownOutline, TiArrowUpOutline } from "react-icons/ti";

import styled, { css } from "styled-components";

const StyledArrowUp = styled(TiArrowUpOutline)`
  ${props =>
    props.active === "asc" &&
    css`
      transform: scale(1.3);
      color: "white";
    `}
`;

const StyledArrowDown = styled(TiArrowDownOutline)`
  ${props =>
    props.active === "desc" &&
    css`
      transform: scale(1.3);
      color: "white";
    `}
`;

class Filter extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleCategoryCheckboxChange = this.handleCategoryCheckboxChange.bind(
      this
    );
    this.handleSubjectCheckboxChange = this.handleSubjectCheckboxChange.bind(
      this
    );
    this.handleLocationCheckboxChange = this.handleLocationCheckboxChange.bind(
      this
    );
    this.state = { collapse: false, checked: false };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  handleCategoryCheckboxChange = event => {
    this.props.categoryCheckboxChange(event.target.id);
  };

  handleSubjectCheckboxChange = event => {
    this.props.subjectCheckboxChange(event.target.id);
  };

  handleLocationCheckboxChange = event => {
    this.props.locationCheckboxChange(event.target.id);
  };

  handleSortButtonChange = event => {
    event.preventDefault();
    if (event.target.id) {
      this.props.sortButtonChange(event.target.id);
    }
  };

  render() {
    const categoryCheckboxesBlock = (
      <div>
        <label>
          <input
            name="show all"
            type="checkbox"
            id="all"
            checked={this.props.categoryCheckboxes["all"]}
            onChange={this.handleCategoryCheckboxChange}
          />
          show all
        </label>
        <label>
          <input
            name="teach"
            type="checkbox"
            id="teach"
            checked={this.props.categoryCheckboxes["teach"]}
            onChange={this.handleCategoryCheckboxChange}
          />
          teach
        </label>
        <label>
          <input
            name="learn"
            type="checkbox"
            id="learn"
            checked={this.props.categoryCheckboxes["learn"]}
            onChange={this.handleCategoryCheckboxChange}
          />
          learn
        </label>
      </div>
    );
    const subjectCheckboxesBlock = (
      <div>
        <label>
          <input
            name="show all"
            type="checkbox"
            id="all"
            checked={this.props.subjectCheckboxes["all"]}
            onChange={this.handleSubjectCheckboxChange}
          />
          show all
        </label>
        <label>
          <input
            name="english"
            type="checkbox"
            id="english"
            checked={this.props.subjectCheckboxes["english"]}
            onChange={this.handleSubjectCheckboxChange}
          />
          english
        </label>
        <label>
          <input
            name="chinese"
            type="checkbox"
            id="chinese"
            checked={this.props.subjectCheckboxes["chinese"]}
            onChange={this.handleSubjectCheckboxChange}
          />
          chinese
        </label>
        <label>
          <input
            name="math"
            type="checkbox"
            id="math"
            checked={this.props.subjectCheckboxes["math"]}
            onChange={this.handleSubjectCheckboxChange}
          />
          math
        </label>
        <label>
          <input
            name="science"
            type="checkbox"
            id="science"
            checked={this.props.subjectCheckboxes["science"]}
            onChange={this.handleSubjectCheckboxChange}
          />
          science
        </label>
        <label>
          <input
            name="others"
            type="checkbox"
            id="others"
            checked={this.props.subjectCheckboxes["others"]}
            onChange={this.handleSubjectCheckboxChange}
          />
          others
        </label>
      </div>
    );
    const locationCheckboxesBlock = (
      <div>
        <label>
          <input
            name="show all"
            type="checkbox"
            id="all"
            checked={this.props.locationCheckboxes["all"]}
            onChange={this.handleLocationCheckboxChange}
          />
          show all
        </label>
        <label>
          <input
            name="north"
            type="checkbox"
            id="north"
            checked={this.props.locationCheckboxes["north"]}
            onChange={this.handleLocationCheckboxChange}
          />
          north
        </label>
        <label>
          <input
            name="south"
            type="checkbox"
            id="south"
            checked={this.props.locationCheckboxes["south"]}
            onChange={this.handleLocationCheckboxChange}
          />
          south
        </label>
        <label>
          <input
            name="east"
            type="checkbox"
            id="east"
            checked={this.props.locationCheckboxes["east"]}
            onChange={this.handleLocationCheckboxChange}
          />
          east
        </label>
        <label>
          <input
            name="west"
            type="checkbox"
            id="west"
            checked={this.props.locationCheckboxes["west"]}
            onChange={this.handleLocationCheckboxChange}
          />
          west
        </label>
        <label>
          <input
            name="others"
            type="checkbox"
            id="others"
            checked={this.props.locationCheckboxes["others"]}
            onChange={this.handleLocationCheckboxChange}
          />
          others
        </label>
      </div>
    );

    const sortButtonsBlock = (
      <div>
        <Button
          id="createdAt"
          outline
          color="primary"
          active={this.props.sortButtons["createdAt"] !== false}
          onClick={this.handleSortButtonChange}
        >
          Date Posted
          <StyledArrowUp
            hidden={this.props.sortButtons["createdAt"] == false}
            active={this.props.sortButtons["createdAt"]}
          />
          <StyledArrowDown
            hidden={this.props.sortButtons["createdAt"] == false}
            active={this.props.sortButtons["createdAt"]}
          />
        </Button>
        <Button
          id="price"
          outline
          color="success"
          active={this.props.sortButtons["price"] !== false}
          onClick={this.handleSortButtonChange}
        >
          Price
          <StyledArrowUp
            hidden={this.props.sortButtons["price"] == false}
            active={this.props.sortButtons["price"]}
          />
          <StyledArrowDown
            hidden={this.props.sortButtons["price"] == false}
            active={this.props.sortButtons["price"]}
          />
        </Button>
        <Button
          id="likes"
          outline
          color="danger"
          active={this.props.sortButtons["likes"] !== false}
          onClick={this.handleSortButtonChange}
        >
          Popularity
          <StyledArrowUp
            hidden={this.props.sortButtons["likes"] == false}
            active={this.props.sortButtons["likes"]}
          />
          <StyledArrowDown
            hidden={this.props.sortButtons["likes"] == false}
            active={this.props.sortButtons["likes"]}
          />
        </Button>
      </div>
    );
    return (
      <div>
        <Button
          color="primary"
          onClick={this.toggle}
          style={{ marginBottom: "1rem" }}
        >
          Filter
        </Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              {categoryCheckboxesBlock}
              {subjectCheckboxesBlock}
              {locationCheckboxesBlock}
              {sortButtonsBlock}
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categoryCheckboxes: state.filter.checkboxes.category,
    subjectCheckboxes: state.filter.checkboxes.subject,
    locationCheckboxes: state.filter.checkboxes.location,
    sortButtons: state.filter.checkboxes.sort
  };
};

const mapDispatchToProps = dispatch => {
  return {
    categoryCheckboxChange: id => dispatch(categoryCheckboxChange(id)),
    subjectCheckboxChange: id => dispatch(subjectCheckboxChange(id)),
    locationCheckboxChange: id => dispatch(locationCheckboxChange(id)),
    sortButtonChange: id => dispatch(sortButtonChange(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
