import React, { Component } from "react";
import { Collapse, Button, CardBody, Card, Input } from "reactstrap";
import { connect } from "react-redux";
import {
  categoryCheckboxChange,
  subjectCheckboxChange,
  locationCheckboxChange,
  sortButtonChange,
  searchFilterChange
} from "../store/actions/filterActions";
import { TiArrowDownOutline, TiArrowUpOutline } from "react-icons/ti";
import { IoIosCloseCircleOutline } from "react-icons/io";

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

const StyledSearchInput = styled(Input)``;

class Filter extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    const categoryCheckboxesBlock = (
      <div>
        <label>
          <input
            name="show all"
            type="checkbox"
            id="all"
            checked={this.props.categoryCheckboxes["all"]}
            onChange={this.props.categoryCheckboxChange}
          />
          show all
        </label>
        <label>
          <input
            name="teach"
            type="checkbox"
            id="teach"
            checked={this.props.categoryCheckboxes["teach"]}
            onChange={this.props.categoryCheckboxChange}
          />
          teach
        </label>
        <label>
          <input
            name="learn"
            type="checkbox"
            id="learn"
            checked={this.props.categoryCheckboxes["learn"]}
            onChange={this.props.categoryCheckboxChange}
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
            onChange={this.props.subjectCheckboxChange}
          />
          show all
        </label>
        <label>
          <input
            name="english"
            type="checkbox"
            id="english"
            checked={this.props.subjectCheckboxes["english"]}
            onChange={this.props.subjectCheckboxChange}
          />
          english
        </label>
        <label>
          <input
            name="chinese"
            type="checkbox"
            id="chinese"
            checked={this.props.subjectCheckboxes["chinese"]}
            onChange={this.props.subjectCheckboxChange}
          />
          chinese
        </label>
        <label>
          <input
            name="math"
            type="checkbox"
            id="math"
            checked={this.props.subjectCheckboxes["math"]}
            onChange={this.props.subjectCheckboxChange}
          />
          math
        </label>
        <label>
          <input
            name="science"
            type="checkbox"
            id="science"
            checked={this.props.subjectCheckboxes["science"]}
            onChange={this.props.subjectCheckboxChange}
          />
          science
        </label>
        <label>
          <input
            name="others"
            type="checkbox"
            id="others"
            checked={this.props.subjectCheckboxes["others"]}
            onChange={this.props.subjectCheckboxChange}
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
            onChange={this.props.locationCheckboxChange}
          />
          show all
        </label>
        <label>
          <input
            name="north"
            type="checkbox"
            id="north"
            checked={this.props.locationCheckboxes["north"]}
            onChange={this.props.locationCheckboxChange}
          />
          north
        </label>
        <label>
          <input
            name="south"
            type="checkbox"
            id="south"
            checked={this.props.locationCheckboxes["south"]}
            onChange={this.props.locationCheckboxChange}
          />
          south
        </label>
        <label>
          <input
            name="east"
            type="checkbox"
            id="east"
            checked={this.props.locationCheckboxes["east"]}
            onChange={this.props.locationCheckboxChange}
          />
          east
        </label>
        <label>
          <input
            name="west"
            type="checkbox"
            id="west"
            checked={this.props.locationCheckboxes["west"]}
            onChange={this.props.locationCheckboxChange}
          />
          west
        </label>
        <label>
          <input
            name="central"
            type="checkbox"
            id="central"
            checked={this.props.locationCheckboxes["central"]}
            onChange={this.props.locationCheckboxChange}
          />
          central
        </label>
        <label>
          <input
            name="others"
            type="checkbox"
            id="others"
            checked={this.props.locationCheckboxes["others"]}
            onChange={this.props.locationCheckboxChange}
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
          onClick={this.props.sortButtonChange}
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
          onClick={this.props.sortButtonChange}
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
          onClick={this.props.sortButtonChange}
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

    const searchFilterBlock = (
      <div>
        <StyledSearchInput
          placeholder="Search for post by title, description, author's name"
          id="input"
          value={this.props.searchValue}
          onChange={this.props.searchFilterChange}
        />
        {this.props.searchValue ? (
          <IoIosCloseCircleOutline
            id="clear"
            onClick={this.props.searchFilterChange}
          />
        ) : null}
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
        {/* HERE */}
        {searchFilterBlock}
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
    sortButtons: state.filter.checkboxes.sort,
    searchValue: state.filter.checkboxes.search
  };
};

const mapDispatchToProps = dispatch => {
  return {
    categoryCheckboxChange: event => dispatch(categoryCheckboxChange(event)),
    subjectCheckboxChange: event => dispatch(subjectCheckboxChange(event)),
    locationCheckboxChange: event => dispatch(locationCheckboxChange(event)),
    sortButtonChange: event => dispatch(sortButtonChange(event)),
    searchFilterChange: event => dispatch(searchFilterChange(event))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
