import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { MdDeleteForever } from "react-icons/md";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deletePost } from "../../store/actions/postActions";

import styled from "styled-components";

const StyledDeleteIcon = styled(MdDeleteForever)`
  :hover {
    animation: wiggle 0.1s 7 alternate;
  }

  @keyframes wiggle {
    0% {
      transform: rotate(-2deg) scale(1.1);
    }
    100% {
      transform: rotate(2deg) scale(1.1);
    }
  }
`;

class DeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleDelete() {
    this.props.deletePost(this.props.pid);
    this.toggle();
    this.props.history.push(`/Dashboard`)
  }

  render() {
    const deleteButton = (
      <StyledDeleteIcon style={{float:"right"}}size="3em" color="red" onClick={this.toggle} />
    );
    return (
      <div>
        {deleteButton}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          centered
        >
          <ModalHeader toggle={this.toggle}>Delete post</ModalHeader>
          <ModalBody>Are you sure you want to delete this post?</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.handleDelete}>
              Confirm
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deletePost: pid => dispatch(deletePost(pid))
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(DeleteModal)
);
