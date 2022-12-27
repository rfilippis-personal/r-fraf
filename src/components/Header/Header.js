import { Link, NavLink } from "react-router-dom";
import { StyledHeader } from "./styles";
import Logo from "../Logo/logo";
import { Grid, Row, Col } from "rsuite";

const navLinks = [
  { name: "React Suit form validation", path: "rsFormValidation" },
  { name: "Manual Form Validation", path: "manualFormValidation" },
  {
    name: "React Suit dinamic form validation",
    path: "rsDinamicFormValidadtion",
  },
  { name: "Large cards list", path: "largeCardsList" },
];

const Header = () => {
  return (
    <StyledHeader>
      <Grid>
        <Row>
          <Col xs={4} sm={4} md={3} lg={2}>
            <Link to="/">
              <Logo></Logo>
            </Link>
          </Col>
          <Col xs={20} sm={20} md={21} lg={22}>
            <nav>
              {navLinks.map((navInfo) => (
                <NavLink
                  key={navInfo.name}
                  to={navInfo.path}
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "pending" : ""
                  }
                >
                  {navInfo.name}
                </NavLink>
              ))}
            </nav>
          </Col>
        </Row>
      </Grid>
    </StyledHeader>
  );
};

export default Header;
