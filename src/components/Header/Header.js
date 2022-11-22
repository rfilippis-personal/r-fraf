import { StyledHeader } from "../../styles";
import Logo from "../Logo/Logo";

const Header = () => {
  return (
    <StyledHeader>
      <Logo></Logo>
      <nav>
        <span href="#">Link 1</span>
        <span href="#">Link 2</span>
        <span href="#">Link 3</span>
        <span href="#">Link 4</span>
      </nav>
      <div>Avatar</div>
    </StyledHeader>
  );
};

export default Header;
