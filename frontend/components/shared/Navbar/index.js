import React from 'react';
import styled from '@emotion/styled';
import DesktopNav from './DesktopNav';
const Nav = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const Navbar = () => (
  <Nav>
    <DesktopNav />
  </Nav>
);
export default Navbar;