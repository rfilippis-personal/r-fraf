import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: white;
    font-family:Helvetica, Sans-Serif, Open-Sans;
  }

  main {
    min-height: 1000px;
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
    z-index:10;
  }

  .json-tree-wrapper {
    background: rgb(0, 43, 54) !important;
    /* margin: 20px !important; */
  
    .rs-panel-header {
      background: #06232c;
      border-radius: 6px;
      color: #fff;
    }
  
    .rs-panel-body {
      padding: 0 4px 8px 10px;
    }
  }

  .rs-form-error-message {
    filter:none;
    box-shadow:0px 0px 6px lightgray;
  }

  .rs-breadcrumb {
    margin-bottom: 10px;
    margin-top: 5px;
  }

  .fa-align {
    margin-bottom: -1px;
    margin-right: 3px;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .displayScrollTable {
    .rs-table-scrollbar-vertical {
      display: none;
    }
  }

  .rs-loader-backdrop {
    position: fixed;
  }

  .button-with-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .select-picker-custom-style.rs-picker-has-value .rs-btn .rs-picker-toggle-value, .rs-picker-has-value .rs-picker-toggle .rs-picker-toggle-value {
    color: var(--rs-text-primary);
  }

  // [aria-invalid='true'] {
  //   border: 1px solid #b40e0e;
  //   background-color: #fddddd;
  // }
`;

export default GlobalStyle;
