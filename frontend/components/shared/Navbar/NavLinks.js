import React from "react";
import styled from '@emotion/styled';
import Link from 'next/link'
import { useMenuContext } from "../../../utils/state";
import { useTheme } from "../../../utils/hooks";
import Icon from "../Icon";
import Select from '../dataEntry/Select'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router';
import Menu from './NavigationMenu';
import SearchIcon from '@/components/shared/Icon/ThinSearchIcon';
const DesktopNavLinks = () => {
  const { closeMenu } = useMenuContext();

  
  const { t } = useTranslation('nav')
  const router = useRouter()
  
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
          title: 'Digitizations',
          href: 'digitizations'
        },
        {
          title: 'Lesson Plans',
          href: 'lesson-plans',
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
          href: 'our-story'
        },
        {
          title: 'Meet Our Team', 
          href: 'meet-our-team'
        },
        {
          title: t("contact"), 
          href: 'contact'
        }
      ]
    },
    {
      title: t("donate"),
      link: 'donate',
    }
  ];

  const onLanguageChange = (selectedLocale) => {
    if (router.locales.includes(selectedLocale)) {
      router.push(router.pathname, router.pathname, { locale: selectedLocale })
    }
  }
  return (
    <React.Fragment>
      

    <NavLinksWrapper className="nav-links">
      {links.map((link) => (
        <li key={link.link}>
          <Menu link={link.link} links={link.links} href={link.link} title={link.title} />
        </li>
      ))}
      {/* <li>
        <Link href='/search'>
        <a aria-label='search' className='nav-search'>
          <SearchIcon />
        </a>
        </Link>
      </li> */}
      <li>
        <span className='language-selector'>
          <Select 
            labelFor='language'
            labelTitle='Language'
            isScreenReaderOnly
            onChange={onLanguageChange}
            defaultValue={router.locale}
          />

        </span>
       
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
  .language-selector {
    background: transparent;
    display: flex;
    align-items: center;
    svg {
      margin-right: 4px;
    }
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    li {
      padding: 12px;
      margin: 0 !important;
    }
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