import { useState } from "react";
import { Input } from "rsuite";
import Container from "../../components/UI/container/container";
import { Title } from "../../styles";

const Link2 = () => {
  const [inputTest, setInputTest] = useState("");
  return (
    <Container>
      <Title>Test form input manual</Title>
      <label htmlFor="inputTest">Input test</label>
      <div>
        <Input
          id="inputTest"
          value={inputTest}
          onChange={(value) => setInputTest(value)}
        />
      </div>
      <p>
        <b>Value of name:</b> {inputTest}
      </p>
    </Container>
  );
};

export default Link2;
