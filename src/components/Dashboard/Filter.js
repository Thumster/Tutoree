import React, { Component } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import { connect } from "react-redux";
import { categoryCheckboxChange } from "../store/actions/filterActions";

import styled from "styled-components";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleCategoryCheckboxChange = this.handleCategoryCheckboxChange.bind(
      this
    );
    this.state = { collapse: false, checked: false };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  handleCategoryCheckboxChange = event => {
    console.log("called");
    this.props.categoryCheckboxChange(event.target.id);
  };

  render() {
    const categoryCheckboxes = (
      <div>
        <label>
          <input
            name="show all"
            type="checkbox"
            id="SHOWALL"
            checked={this.props.checkboxes["SHOWALL"]}
            onChange={this.handleCategoryCheckboxChange}
          />
          show all
        </label>
        <label>
          <input
            name="teach"
            type="checkbox"
            id="SHOWTEACH"
            checked={this.props.checkboxes["SHOWTEACH"]}
            onChange={this.handleCategoryCheckboxChange}
          />
          teach
        </label>
        <label>
          <input
            name="learn"
            type="checkbox"
            id="SHOWLEARN"
            checked={this.props.checkboxes["SHOWLEARN"]}
            onChange={this.handleCategoryCheckboxChange}
          />
          learn
        </label>
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
            <CardBody>{categoryCheckboxes}</CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    checkboxes: state.filter.checkboxes.category
  };
};

const mapDispatchToProps = dispatch => {
  return {
    categoryCheckboxChange: id => dispatch(categoryCheckboxChange(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
