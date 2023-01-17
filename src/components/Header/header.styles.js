import styled from "styled-components";

export const StyledHeader = styled.header`
  background-color: rgba(0, 0, 0, 0.85);
  padding: 0px 20px;
  color: whitesmoke;
  font-weight: 300;
  font-size: 14px;
  position: sticky;
  top: 0;

  z-index: 10;

  a {
    color: whitesmoke;
  }

  .active {
    // font-weight: 600;
    text-shadow: 0.5px 0px 0px white, -0.5px 0px 0px white;
    // background-color: #333;
  }

  .logo {
    font-weight: 400;
    border: 1px solid whitesmoke;
    padding: 5px;
    text-align: center;
    border-radius: 10px;
    margin: 9px 0;
    box-sizing: border-box;
  }

  .navbar {
    overflow: hidden;

    a {
      float: left;
      font-size: 16px;
      color: white;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
    }
  }

  .dropdown {
    float: left;
    overflow: hidden;

    &.main-active {
      // background-color: #333;
      // font-weight: 600;
      button {
        text-shadow: 0.5px 0px 0px white, -0.5px 0px 0px white;
      }
      a {
        // font-weight: 300;
        &.child-active {
          font-weight: 600;
          background-color: #eee;
        }
      }
    }

    .dropbtn {
      font-size: 16px;
      border: none;
      outline: none;
      color: white;
      padding: 14px 16px;
      background-color: inherit;
      font-family: inherit;
      margin: 0;
    }
  }

  .navbar a:hover,
  .dropdown:hover .dropbtn {
    background-color: rgba(98, 98, 98, 0.5);
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;

    a {
      float: none;
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      text-align: left;
    }

    a:hover {
      background-color: #ddd;
    }
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .hide-menu {
    display: none !important;
  }
`;
