import React, { Component } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";

import styled from "styled-components";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false, checked: false };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  handleCheckboxChange = event => {
    this.setState({ checked: event.target.checked });
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




              
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default Filter;
