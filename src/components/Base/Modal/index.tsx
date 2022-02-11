import React from 'react';
import ReactDOM from 'react-dom';

import { Modal } from 'react-bootstrap';

interface BaseModalProps {
  title: string;
  show?: boolean;
  onClose: () => void;
}

const BaseModal: React.FC<BaseModalProps> = ({
  show,
  title,
  onClose,
  children
}) => {
  const modalElement = document.getElementById('modal');

  return !!modalElement ? ReactDOM.createPortal(
    <Modal
      show={show}
      onHide={onClose}
      data-testid="base-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        { children }
      </Modal.Body>

    </Modal>,
    modalElement
  ) : null
}

export default BaseModal;
