import React from "react";
import { Form } from "rsuite";

const RSField = React.forwardRef((props, ref) => {
  const { name, message, label, accepter, error, ...rest } = props;
  return (
    <Form.Group controlId={name} ref={ref} className={error ? "has-error" : ""}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control
        name={name}
        accepter={accepter}
        errorMessage={error}
        {...rest}
      />
      <Form.HelpText>{message}</Form.HelpText>
    </Form.Group>
  );
});

export default RSField;
