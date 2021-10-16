import React, {useState} from "react";
import Link from 'next/link'
import styled from '@emotion/styled';
import { useMenuContext } from "../../../utils/state";
import { Squash as Hamburger } from "hamburger-react";
import NavLinks from "./NavLinks";
import { useScroll } from "../../../utils/hooks";
import { Global, css } from '@emotion/react'
import Image from 'next/image';
import NavBarSearch from './NavBarSearch';
import {woodSmoke} from '@/styles/colors';

const DesktopNavbar = () => {
  const { isMenuOpen, toggleMenu } = useMenuContext();

  const [isOpen, setOpen] = useState(false);


  return (
   
      <DesktopNav aria-label='Menu'>
        <div className="home-link-container">
          <Link href="/">
            <a>
              <img
                alt='Project Nota'
                className='logo'
                src='/project-nota-lupercal-logo.png'
              />
            </a>
          </Link>
         
        </div>
        <NavLinks />

        <NavBarSearch />
        <button onClick={() => setOpen(!isOpen)}>
          <span className='sr-only'>Menu</span>
          <Hamburger toggled={isOpen} duration={0} />
        </button>
      </DesktopNav>
  
  );
};

export default DesktopNavbar;

const DesktopNav = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  height: 70px;
  background: ${woodSmoke};
  box-shadow: var(--headerBoxShadow);
  color: var(--text);
  transition: all 150ms linear;
  -webkit-transition: background-color 1000ms linear;
    -ms-transition: background-color 1000ms linear;
    transition: background-color 1000ms linear;
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
    /* flex: 2; */
    display: flex;
    flex-direction: row;
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