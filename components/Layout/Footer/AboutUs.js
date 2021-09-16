import React from 'react';
import Link from 'next/link'
import styled from "@emotion/styled";
import {StyledUnorderedList} from 'components/shared/List';

const ABOUT_US_LINK = [
  {
    title: 'Our Story',
    href: '/about/our-story',
  },
  {
    title: 'Meet Our Team',
    href: '/about/meet-our-team',
  },
  {
    title: 'Mission Statement',
    href: '/about/mission-statement',
  }
]

const StyledLink = styled.a`
  padding-bottom: 2px;
  text-decoration: underline;
  &:hover {
    color: white;
    background-color: black;
  }
`

const StyledListItem = styled.li`
  margin-bottom: 12px;
`

const AboutUs = () => {
  return (
    <StyledUnorderedList bulletPoints={false}>
      {ABOUT_US_LINK.map(link => (
        <StyledListItem key={link.title}>
          <Link href={link.href} passHref>
            <StyledLink>
              {link.title}
            </StyledLink>
          </Link>
        </StyledListItem>
      ))}
    </StyledUnorderedList>
  );
};

export default AboutUs;