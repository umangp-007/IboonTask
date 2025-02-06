import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

function Header() {
    const userName =  JSON.parse(localStorage.getItem('user'))
  return (
    <div>
      <Navbar  light expand="md">
        <NavbarBrand href="/">Manage Doctors</NavbarBrand>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink href="/components/">Components</NavLink>
          </NavItem>
        </Nav>
        <NavbarText>Hii, {userName}</NavbarText>
      </Navbar>
    </div>
  );
}

export default Header;
