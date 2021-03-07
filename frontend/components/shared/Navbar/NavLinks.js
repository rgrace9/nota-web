import React from "react";
import styled from '@emotion/styled';
import Link from 'next/link'
import { useMenuContext } from "../../../utils/state";
import { useTheme } from "../../../utils/hooks";
import Icon from "../Icon";
import Select from '../dataEntry/Select'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const DesktopNavLinks = () => {
  const { closeMenu } = useMenuContext();

  
  const { t } = useTranslation('nav')
  const router = useRouter()
  
  const links = [
    {
      title:t('resources'),
      link: 'resources'
    },
    {
      title: t('events'),
      link: 'events'
    },
    {
      title: t("about"),
      link: 'about'
    },
    {
      title: t("contact"), 
      link: 'contact'
    }
  ];

  const onLanguageChange = (selectedLocale) => {
    if (router.locales.includes(selectedLocale)) {
      router.push(router.pathname, router.pathname, { locale: selectedLocale })
    }
  }
  return (
    <NavLinksWrapper className="nav-links">
      {links.map((link) => (
        <li key={link.link}>
          <Link
            href={`/${link.link}`}
            onClick={closeMenu}
            locale={router.locale || router.defaultLocale}
          >
           <NavLink className="link">
            {link.title}
           </NavLink>
          </Link>
        </li>
      ))}
      <li>
        <span className='language-selector'>
          <Icon name='earth' />
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
`;

export const NavLink = styled.a`
  position: relative;
  color: white;
  text-decoration: none;
  cursor: pointer;
  text-transform: capitalize;
  color: var(--text);
  white-space: nowrap;
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
  &:hover::before {
    width: 100%;
  }
`;