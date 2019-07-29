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
import {
  IoIosCloseCircleOutline,
  IoIosPerson,
  IoIosBook
} from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
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

const StyledSearchInput = styled(Input)`
  display: inline;
`;

const Checkbox = ({ className, checked, ...props }) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24" style={{ verticalAlign: "text-top" }}>
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${props => (props.checked ? "salmon" : "papayawhip")}
  border-radius: 3px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }

  ${Icon} {
    visibility: ${props => (props.checked ? "visible" : "hidden")}
  }
`;
const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;
const Column = styled.td`
  width: 105px;
`;
const StyledCancelButton = styled(IoIosCloseCircleOutline)``;

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
      <table style={{ tableLayout: "fixed" }}>
        <tr>
          <Column>
            <IoIosPerson style={{ verticalAlign: "initial", marginRight: 5 }} />
            <label>
              <Checkbox
                name="show all"
                type="checkbox"
                id="all"
                checked={this.props.categoryCheckboxes["all"]}
                onChange={this.props.categoryCheckboxChange}
              />
              <span> Show all</span>
            </label>
          </Column>
          <Column>
            <label>
              <Checkbox
                name="teach"
                type="checkbox"
                id="teach"
                checked={this.props.categoryCheckboxes["teach"]}
                onChange={this.props.categoryCheckboxChange}
              />
              <span> Teach</span>
            </label>
          </Column>
          <Column>
            <label>
              <Checkbox
                name="learn"
                type="checkbox"
                id="learn"
                checked={this.props.categoryCheckboxes["learn"]}
                onChange={this.props.categoryCheckboxChange}
              />
              <span> Learn</span>
            </label>
          </Column>
        </tr>
      </table>
    );
    const subjectCheckboxesBlock = (
      <table style={{ tableLayout: "fixed" }}>
        <tr>
          <Column>
            <IoIosBook style={{ marginRight: 5, verticalAlign: "initial" }} />
            <label>
              <Checkbox
                name="show all"
                type="checkbox"
                id="all"
                checked={this.props.subjectCheckboxes["all"]}
                onChange={this.props.subjectCheckboxChange}
              />
              <span> Show all</span>
            </label>
          </Column>
          <Column>
            <label>
              <Checkbox
                name="english"
                type="checkbox"
                id="english"
                checked={this.props.subjectCheckboxes["english"]}
                onChange={this.props.subjectCheckboxChange}
              />
              <span> English</span>
            </label>
          </Column>
          <Column>
            <label>
              <Checkbox
                name="chinese"
                type="checkbox"
                id="chinese"
                checked={this.props.subjectCheckboxes["chinese"]}
                onChange={this.props.subjectCheckboxChange}
              />
              <span> Chinese</span>
            </label>
          </Column>
          <Column>
            <label>
              <Checkbox
                name="math"
                type="checkbox"
                id="math"
                checked={this.props.subjectCheckboxes["math"]}
                onChange={this.props.subjectCheckboxChange}
              />
              <span> Math</span>
            </label>
          </Column>
          <Column>
            <label>
              <Checkbox
                name="science"
                type="checkbox"
                id="science"
                checked={this.props.subjectCheckboxes["science"]}
                onChange={this.props.subjectCheckboxChange}
              />
              <span> Science</span>
            </label>
          </Column>
          <Column>
            <label>
              <Checkbox
                name="others"
                type="checkbox"
                id="others"
                checked={this.props.subjectCheckboxes["others"]}
                onChange={this.props.subjectCheckboxChange}
              />
              <span> Others</span>
            </label>
          </Column>
        </tr>
      </table>
    );
    const locationCheckboxesBlock = (
      <table>
        <tr>
          <Column>
            <MdLocationOn
              style={{ verticalAlign: "initial", marginRight: 5 }}
            />
            <label>
              <Checkbox
                name="show all"
                type="checkbox"
                id="all"
                checked={this.props.locationCheckboxes["all"]}
                onChange={this.props.locationCheckboxChange}
              />
              <span> Show all</span>
            </label>
          </Column>
          <Column>
            <label>
              <Checkbox
                name="north"
                type="checkbox"
                id="north"
                checked={this.props.locationCheckboxes["north"]}
                onChange={this.props.locationCheckboxChange}
              />
              <span> North</span>
            </label>
          </Column>
          <Column>
            <label>
              <Checkbox
                name="south"
                type="checkbox"
                id="south"
                checked={this.props.locationCheckboxes["south"]}
                onChange={this.props.locationCheckboxChange}
              />
              <span> South</span>
            </label>
          </Column>
          <Column>
            <label>
              <Checkbox
                name="east"
                type="checkbox"
                id="east"
                checked={this.props.locationCheckboxes["east"]}
                onChange={this.props.locationCheckboxChange}
              />
              <span> East</span>
            </label>
          </Column>
          <Column>
            <label>
              <Checkbox
                name="west"
                type="checkbox"
                id="west"
                checked={this.props.locationCheckboxes["west"]}
                onChange={this.props.locationCheckboxChange}
              />
              <span> West</span>
            </label>
          </Column>
          <Column>
            <label>
              <Checkbox
                name="central"
                type="checkbox"
                id="central"
                checked={this.props.locationCheckboxes["central"]}
                onChange={this.props.locationCheckboxChange}
              />
              <span> Central</span>
            </label>
          </Column>
          <Column>
            <label>
              <Checkbox
                name="others"
                type="checkbox"
                id="others"
                checked={this.props.locationCheckboxes["others"]}
                onChange={this.props.locationCheckboxChange}
              />
              <span> Others</span>
            </label>
          </Column>
        </tr>
      </table>
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
      <span style={{ display: "inline", width: "100%" }}>
        {this.props.searchValue ? (
          <StyledCancelButton
            color="326FA6"
            size="35px"
            style={{ position: "absolute", right: 17, marginTop: 2 }}
            id="clear"
            onClick={this.props.searchFilterChange}
          />
        ) : null}
        <StyledSearchInput
          placeholder="Search for post by title, description, author's name"
          id="input"
          value={this.props.searchValue}
          onChange={this.props.searchFilterChange}
        />
      </span>
    );
    return (
      <div>
        <div className="row" style={{ marginTop: 5 }}>
          <div className="col-10">{searchFilterBlock}</div>
          <div className="col-2">
            <Button
              color="primary"
              onClick={this.toggle}
              style={{ display: "inline", margin: 0, width: "100%" }}
            >
              Filter
            </Button>
          </div>
        </div>

        {/* HERE */}

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
