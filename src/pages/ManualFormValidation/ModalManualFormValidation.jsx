import { Button, Modal } from "rsuite";
import classes from "./ModalManualFormValidation.module.css";

const ModalManualFormValidation = (props) => {
  const { open, handleClose, handleCancel, enteredFirstName, enteredLastName, age, uf, city, onOpen } = props;
  return (
    <Modal open={open} onClose={handleCancel} onOpen={onOpen}>
      <Modal.Header>
        <Modal.Title>Your Info is</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <main className={classes.main}>
          <p>
            <b>First name:</b> {enteredFirstName}
          </p>
          <p>
            <b>Last name:</b> {enteredLastName}
          </p>
          <p>
            <b>Age:</b> {age}
          </p>
          <p>
            <b>Uf:</b> {uf}
          </p>
          <p>
            <b>city:</b> {city}
          </p>
        </main>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCancel} appearance="subtle">
          Cancel
        </Button>
        <Button onClick={handleClose} appearance="primary">
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalManualFormValidation;
