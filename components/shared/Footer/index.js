import React from 'react';
import styled from "@emotion/styled";
import StyledLink from '@/components/shared/Link/StyledLink'

const StyledFooter = styled.footer`
  background-color: #DEB9AD;
  text-align: center;
  min-height: 100px;
  padding: 20px;
  position: absolute;
  bottom: 0;
  width: 100%;
`
const Footer = () => {
  return (
    <StyledFooter>


      <div >
        <p>
        Project Nota is a group dedicated to drawing attention
to the Latin letters and works of famous women by focusing on the digitization of
texts, translating these texts into English, Spanish, and French, and increasing their
overall accessibility. Among us we have over 150 years of Latin experience including
many years of teaching experience, seven advanced degrees, many publications in
academic journals, and multiple positions in professional organizations.
        </p>
        <p>Project Nota &copy; 2021</p>

        <p>

          Contact Us: <StyledLink href={`mailto:${`projectnotaforwomen@gmail.com`}`}>projectnotaforwomen@gmail.com</StyledLink>
        </p>
      </div>

    </StyledFooter>
  );
};

export default Footer;