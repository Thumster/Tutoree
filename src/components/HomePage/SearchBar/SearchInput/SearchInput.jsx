import React from 'react';
import { InputGroup, Button, InputGroupAddon, Input } from 'reactstrap';

const SearchInput = (props) => {
  return (
    <div>
      <InputGroup>
        <Input/>
        <InputGroupAddon addonType="append">
          <Button style={{backgroundColor: "#326FA6"}}>Search</Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default SearchInput;