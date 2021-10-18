import React from "react";
import styled from '@emotion/styled';
import Link from 'next/link'
import { useMenuContext } from "../../../utils/state";
import { useTheme } from "../../../utils/hooks";
import Icon from "../Icon";
import { useTranslation } from 'next-i18next'
import Menu from './NavigationMenu';
import SearchIcon from '@/components/shared/Icon/ThinSearchIcon';
const DesktopNavLinks = () => {
  const { closeMenu } = useMenuContext();

  
  const { t } = useTranslation('nav')
  
  const links = [
    {
      title:t('resources'),
      link: 'resources',
      links: [
        {
          title: 'Authors',
          href: 'authors'
        },
        {
          title: 'Lesson Plans',
          href: 'lesson-plans',
        },
        {
          title: 'Transcriptions',
          href: 'transcriptions'
        },
        {
          title: 'Translations',
          href: 'translations'
        }
      ]
    },
    {
      title: t('events'),
      link: 'events',
      links: [
        {
          title: 'Transcribathons',
          href: 'transcribathons'
        }
      ]
    },
    {
      title: t("about"),
      link: 'about',
      links: [
        {
          title: 'Our Story',
          href: 'about/our-story'
        },
        {
          title: 'Meet Our Team', 
          href: 'about/meet-our-team'
        },
        {
          title: t("contact"), 
          href: 'contact'
        },
        {
          title: 'Mission Statement',
          href: 'about/mission-statement'
        }
      ]
    },
    {
      title: t("donate"),
      link: 'donate',
    }
  ];


  return (
    <React.Fragment>
      

    <NavLinksWrapper className="nav-links">
      {links.map((link) => (
        <li key={link.link}>
          <Menu link={link.link} links={link.links} href={link.link} title={link.title} />
        </li>
      ))}
      <li>
      </li>
    </NavLinksWrapper>
    </React.Fragment>
  );
};

export default DesktopNavLinks;

const NavLinksWrapper = styled.ul`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  li:not(:last-child) {
    margin-right: 26px;
  }
  li:last-child {
    margin-left: auto;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;

  }
  .nav-search {
    position: relative;
  text-decoration: none;
  cursor: pointer;
  text-transform: capitalize;
  color: var(--text);
  white-space: nowrap;
  font-size: 18px;
    display: flex;
    padding: 2px;
  &:focus {
      outline: 1px solid white;
    
    }


  }
`;

export const NavLink = styled.a`
  position: relative;
  color: white;
  /* text-decoration: none; */
  cursor: pointer;
  text-transform: capitalize;
  color: var(--text);
  white-space: nowrap;
  font-size: 18px;
  &::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    bottom: -2px;
    height: 2px;
    width: 0;
    background: var(--text);
    transition: width 150ms linear;
  }
  &:focus {
      outline: 1px solid white;
    
    }
  &:hover::before {
    width: 100%;
  }

`;