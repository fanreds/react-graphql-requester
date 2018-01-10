import React from "react";
import {Button, Modal} from 'react-bootstrap';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
  .modal-content {
    padding: 10px;
  }
`;

export default ({show, onClose, response, ...restProps}) => {
  return (
    <div>
      <StyledModal show={show} onHide={onClose}>
        <Modal.Header>Response is:</Modal.Header>
        <Modal.Body>
          <div>{response}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>Close</Button>
        </Modal.Footer>
      </StyledModal>
    </div>
  )
};
