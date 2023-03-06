import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonToolbar, FlexboxGrid, Form, InputNumber, Message, Radio, RadioGroup, toaster } from "rsuite";
import Container from "../../components/UI/Container/Container";
import RSTextField from "../../components/UI/RSTextField/RSTextField";
import { Title } from "../../styles/styles";
import { getEmptyData } from "./blankForTraining.services";
import model from "./blankForTrainingForm.model";
import { BsSave } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import InputMask from "../../components/UI/InputMaskCpfCnpj/InputMaskCpfCnpj";
import { scrollToAnimatedSmooth } from "../../utils/scrollTo.util";
// import { scrollToAnimatedStandard } from "../../utils/scrollTo.util";
import { getFirstFormErrorKey } from "../../utils/rsForm.util";

const InputMaskCpfCnpj = React.forwardRef((props, ref) => {
  const { value, onChange, ...rest } = props;
  return <InputMask ref={ref} value={value || ""} onChange={(value) => onChange(value)} {...rest} />;
});

const BlankForTraningForm = ({ formInfo }) => {
  let formInfoData = formInfo;

  if (formInfo) formInfoData.cpfCnpj = "30591840898";
  if (!formInfo) formInfoData = getEmptyData();

  const formRef = useRef();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(formInfoData);

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
        <Message showIcon type="error" header="Error">
          There are fields invalid, please check the form
        </Message>
      );
      scrollToAnimatedSmooth(120).elementId(getFirstFormErrorKey(model, formValue));
      // scrollToAnimatedStandard(110).elementId(getFirstFormErrorKey(model, formValue));
      return;
    }

    toaster.push(
      <Message showIcon type="success" header="Success">
        Success to save data!
      </Message>
    );
    navigate("/blankForTraining");
  };

  return (
    <Container>
      <Title>Form for blank for training {formInfoData.id && `id ${formInfoData.id}`}</Title>
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={12}>
          <Form fluid ref={formRef} onChange={setFormValue} formValue={formValue} model={model} autoComplete="off">
            <RSTextField name="firstName" label="First Name" onChange={fullNameHandler}></RSTextField>

            <RSTextField name="lastName" label="Last Name" onChange={fullNameHandler}></RSTextField>

            <RSTextField name="name" label="Full Name" readOnly></RSTextField>

            <RSTextField name="gender" label="Gender" accepter={RadioGroup} inline>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              <Radio value="other">Other</Radio>
            </RSTextField>

            <RSTextField name="age" label="age" accepter={InputNumber}></RSTextField>

            <RSTextField name="city" label="City"></RSTextField>
            <RSTextField name="street" label="Street"></RSTextField>
            <RSTextField name="email" label="E-mail"></RSTextField>

            <RSTextField name="cpfCnpj" label="CPF/CPNJ" accepter={InputMaskCpfCnpj}></RSTextField>

            <ButtonToolbar>
              <Button onClick={cancelHandler} className="button-with-icon">
                <MdOutlineCancel style={{ fontSize: "18px" }} className="fa-align" />
                cancel
              </Button>
              <Button appearance="primary" onClick={submitHandler} className="button-with-icon">
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
