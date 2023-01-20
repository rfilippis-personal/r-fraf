import { Button, Modal } from "rsuite";

const ModalManualFormValidation = (props) => {
  const { open, handleClose, handleCancel, enteredName, enteredLastName } =
    props;
  return (
    <Modal open={open} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>Your Info is</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <b>Name:</b> {enteredName}
        </p>
        <p>
          <b>Last name:</b> {enteredLastName}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} appearance="primary">
          Ok
        </Button>
        <Button onClick={handleCancel} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalManualFormValidation;
