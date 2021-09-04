import React from "react";
import Link from 'next/link'
import styled from '@emotion/styled';
import { useMenuContext } from "../../../utils/state";
import { Squash as Hamburger } from "hamburger-react";
import NavLinks from "./NavLinks";
import { useScroll } from "../../../utils/hooks";
import { Global, css } from '@emotion/react'
import Image from 'next/image';

const DesktopNavbar = () => {
  const { isMenuOpen, toggleMenu } = useMenuContext();

  
  return (
   
      <DesktopNav aria-label='Menu'>
        <div className="home-link-container">
        <Link href="/">
          <a className='home-link'>
          <img
            alt='Project Nota'
      
            className='logo'
        
          src='/project-nota-lupercal-logo.png'
          />

          </a>
        </Link>

        </div>
        <NavLinks />
        <Hamburger toggled={isMenuOpen} toggle={toggleMenu} duration={0} />
      </DesktopNav>
  
  );
};

export default DesktopNavbar;

const DesktopNav = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  background: var(--headerBg);
  box-shadow: var(--headerBoxShadow);
  color: var(--text);
  transition: all 150ms linear;
  -webkit-transition: background-color 1000ms linear;
    -ms-transition: background-color 1000ms linear;
    transition: background-color 1000ms linear;
  /* ${(props) =>
    props.isScrolled &&
    css`
      background: var(--headerBg);
      box-shadow: var(--headerBoxShadow);
    `} */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 4px 60px;
  z-index: 2;
  @media screen and (max-width: 768px) {
    justify-content: space-between;
    padding: 0 30px;
  }
  .home-link-container {
    flex: 2;
    /* color: var(--text);
    font-size: 32px; */
  }
  .home-link {
    &:focus {
  
    outline: 1px solid var(--text);
    }
  }
  .logo {
    width: 200px;

  }
  .nav-links {
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  .hamburger-react {
    display: none;
    z-index: 99;
    & > div > div {
      background: var(--text) !important;
    }
    @media screen and (max-width: 768px) {
      display: block;
    }
  }
`;