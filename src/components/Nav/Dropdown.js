import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.learn = this.learn.bind(this);
    this.teach = this.teach.bind(this);

    this.state = {
      dropdownOpen: false,
      wantTo: "Want to..."
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  learn() {
      this.setState({
        wantTo: "Want to learn"
      });
  }

  teach() {
      this.setState({
          wantTo: "Want to teach"
      });
  }

  render() {
    return (
        
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="SearchDropdown">
        <DropdownToggle caret style={{backgroundColor: "black"}}>
          {this.state.wantTo}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.learn}>Want to learn</DropdownItem>
          <DropdownItem onClick={this.teach}>Want to teach</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}