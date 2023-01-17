import { Fragment, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { StyledHeader } from "./header.styles";
import Logo from "../Logo/Logo";
import { Grid, Row, Col } from "rsuite";
import ArrowDownIcon from "@rsuite/icons/ArrowDown";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

const navLinks = [
  {
    name: "Forms",
    parent: "",
    path: "",
    children: [
      {
        name: "React Suit form validation",
        path: "rsFormValidation",
        parent: "Forms",
      },
      {
        name: "React Suit dinamic form validation",
        path: "rsDinamicFormValidadtion",
        parent: "Forms",
      },
      {
        name: "Manual Form Validation",
        path: "manualFormValidation",
        parent: "Forms",
      },
    ],
  },
  { name: "Large cards list", path: "largeCardsList", parent: "" },
  { name: "Blank For Training", path: "blankForTraning", parent: "" },
];

const Header = () => {
  const [mainActive, setMainActive] = useState("");
  const [hideMenu, setHideMenu] = useState("");
  const location = useLocation();

  const findSelectedLink = (navLinks, location) => {
    navLinks.forEach((navLink) => {
      if (navLink.path === location) {
        setMainActive(navLink.parent);
      }
    });
  };

  const linkClickHandler = (event) => {
    setHideMenu("hide-menu");
    setTimeout(() => setHideMenu(""), 300);
  };

  useEffect(() => {
    const path = location.pathname.replace("/", "");
    findSelectedLink(navLinks, path);
    navLinks.forEach((currentItem) => {
      if (currentItem?.children) findSelectedLink(currentItem.children, path);
    });
  }, [location]);

  return (
    <StyledHeader>
      <Grid>
        <Row>
          <Col xs={4} sm={4} md={3} lg={2}>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              <Logo></Logo>
            </NavLink>
          </Col>
          <Col xs={20} sm={20} md={21} lg={22}>
            <div className="navbar">
              {navLinks.map((navInfo, index) => (
                <Fragment key={navInfo.name}>
                  {!navInfo?.children && (
                    <NavLink
                      to={navInfo.path}
                      className={({ isActive, isPending }) =>
                        isActive ? "active" : isPending ? "pending" : ""
                      }
                    >
                      {navInfo.name}
                    </NavLink>
                  )}
                  {navInfo?.children && (
                    <div
                      className={`dropdown ${
                        mainActive === navInfo.name ? "main-active" : ""
                      }`}
                    >
                      <button className="dropbtn">
                        {navInfo.name}
                        <ArrowDownIcon />
                      </button>
                      <div className={`dropdown-content ${hideMenu}`}>
                        {navInfo.children.map((navInfo) => (
                          <NavLink
                            key={navInfo.name}
                            to={navInfo.path}
                            onClick={linkClickHandler}
                            className={({ isActive, isPending }) =>
                              isActive
                                ? "child-active"
                                : isPending
                                ? "pending"
                                : ""
                            }
                          >
                            {navInfo.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </Col>
        </Row>
        <Breadcrumbs />
      </Grid>
    </StyledHeader>
  );
};

export default Header;
