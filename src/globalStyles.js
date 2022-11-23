import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: white;
    font-family:Helvetica, Sans-Serif, Open-Sans;
  }

  main {
    height: 2000px;
  }

  p {
    margin:5px 0;
  }

  label {
    display:block;
    margin-bottom:4px;
  }

  footer {
    width: 100%;
    background-color: rgba(0,0,0,85);
    color: whitesmoke;
    font-size: 12px;
    font-weight: 300;
    padding: 3px;
    text-align: right;
    box-sizing: border-box;
    position: sticky;
    bottom: 0;
  }
`;

export default GlobalStyle;
