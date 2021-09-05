import React from 'react';
import Link from 'next/link'
import styled from "@emotion/styled";

const ABOUT_US_LINK = [
  {
    title: 'Our Story',
    href: '#',
  },
  {
    title: 'Meet Our Team',
    href: '#',
  },
  {
    title: 'Mission Statement',
    href: '#',
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
    <ul>
      {ABOUT_US_LINK.map(link => (
        <StyledListItem key={link.title}>
          <Link href={link.href} passHref>
            <StyledLink>
              {link.title}
            </StyledLink>
          </Link>
        </StyledListItem>
      ))}
    </ul>
  );
};

export default AboutUs;