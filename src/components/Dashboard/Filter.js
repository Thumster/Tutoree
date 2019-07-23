import React, { Component } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import { connect } from "react-redux";
import { checkboxChange } from "../store/actions/filterActions";

import styled from "styled-components";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.state = { collapse: false, checked: false };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  handleCheckboxChange = event => {
    this.props.checkboxChange(event.target.id);
  };

  render() {
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
              <label>
                <input
                  name="show all"
                  type="checkbox"
                  id="SHOWALL"
                  checked={this.props.checkboxes["SHOWALL"]}
                  onChange={this.handleCheckboxChange}
                />
                show all
              </label>
              <label>
                <input
                  name="teach"
                  type="checkbox"
                  id="SHOWTEACH"
                  checked={this.props.checkboxes["SHOWTEACH"]}
                  onChange={this.handleCheckboxChange}
                />
                teach
              </label>
              <label>
                <input
                  name="learn"
                  type="checkbox"
                  id="SHOWLEARN"
                  checked={this.props.checkboxes["SHOWLEARN"]}
                  onChange={this.handleCheckboxChange}
                />
                learn
              </label>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    checkboxes: state.filter.checkboxes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkboxChange: id => dispatch(checkboxChange(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
