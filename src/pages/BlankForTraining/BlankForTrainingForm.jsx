import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ButtonToolbar,
  FlexboxGrid,
  Form,
  InputNumber,
  Message,
  Radio,
  RadioGroup,
  toaster,
} from "rsuite";
import Container from "../../components/UI/Container/Container";
import RSTextField from "../../components/UI/RSTextField/RSTextField";
import { Title } from "../../styles/styles";
import { getEmptyData } from "./BlankForTraining.services";
import model from "./BlankForTrainingForm.model";
import { BsSave } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";

const BlankForTraningForm = ({ formInfo }) => {
  let formInfoData = formInfo;

  if (!formInfo) formInfoData = getEmptyData();

  const formRef = useRef();
  const [formValue, setFormValue] = useState(formInfoData);

  const navigate = useNavigate();

  const fullNameHandler = () => {
    setFormValue((currentFormValue) => ({
      ...currentFormValue,
      name: `${currentFormValue.firstName} ${currentFormValue.lastName}`,
    }));
  };

  const cancelHandler = () => {
    navigate(-1);
  };

  const submitHandler = () => {
    if (!formRef.current.check()) {
      toaster.push(
        <Message type="error">
          There are fields invalid, please check the form
        </Message>
      );
      return;
    }
    toaster.push(<Message type="success">Success to save data!</Message>);
    navigate("/blankForTraining");
  };

  return (
    <Container>
      <Title>
        Form for blank for training {formInfoData.id && `id ${formInfoData.id}`}
      </Title>
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={12}>
          <Form
            fluid
            ref={formRef}
            onChange={setFormValue}
            formValue={formValue}
            model={model}
            autoComplete="off"
          >
            <RSTextField
              name="firstName"
              label="First Name"
              onChange={fullNameHandler}
            ></RSTextField>

            <RSTextField
              name="lastName"
              label="Last Name"
              onChange={fullNameHandler}
            ></RSTextField>

            <RSTextField name="name" label="Full Name" readOnly></RSTextField>

            <RSTextField
              name="gender"
              label="Gender"
              accepter={RadioGroup}
              inline
            >
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              <Radio value="other">Other</Radio>
            </RSTextField>

            <RSTextField
              name="age"
              label="age"
              accepter={InputNumber}
            ></RSTextField>

            <RSTextField name="city" label="City"></RSTextField>
            <RSTextField name="street" label="Street"></RSTextField>
            <RSTextField name="email" label="E-mail"></RSTextField>

            <ButtonToolbar>
              <Button onClick={cancelHandler} className="button-with-icon">
                <MdOutlineCancel
                  style={{ fontSize: "18px" }}
                  className="fa-align"
                />
                cancel
              </Button>
              <Button
                appearance="primary"
                onClick={submitHandler}
                className="button-with-icon"
              >
                <BsSave className="fa-align" /> save
              </Button>
            </ButtonToolbar>
          </Form>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Container>
  );
};

export default BlankForTraningForm;
