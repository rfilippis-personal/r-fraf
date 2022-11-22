import styled from "styled-components";

export const StyledHeader = styled.header`
  background-color: rgba(0, 0, 0, 0.85);
  padding: 0px 20px;
  color: whitesmoke;
  font-weight: 300;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  position: sticky;
  top: 0;

  .logo {
    font-weight: 300;
    font-style: italic;
    border: 1px solid whitesmoke;
    padding: 5px;
    border-radius: 10px;
    margin: 5px;
  }

  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    color: red;
    width: 60%;
  }
`;
