import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './SearchDropdown.css';

export default class SearchDropdown extends React.Component {
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
        <DropdownToggle caret style={{backgroundColor: "#326FA6",  margin:"0px"}}>
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