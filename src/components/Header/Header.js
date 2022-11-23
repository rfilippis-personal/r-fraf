import { Link, NavLink } from "react-router-dom";
import { StyledHeader } from "./styles";
import Logo from "../Logo/logo";
import { Grid, Row, Col } from "rsuite";

const navLinks = [
  { name: "Link 1", path: "link1" },
  { name: "Link 2", path: "link2" },
  { name: "Link 3", path: "link3" },
  { name: "Link 4", path: "link4" },
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
