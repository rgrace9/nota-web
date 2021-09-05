import React from 'react';
import styled from "@emotion/styled";
import StyledLink from '@/components/shared/Link/StyledLink'
import { device } from "@/styles/screenSizes";
import SocialMedia from './SocialMedia';

const StyledFooter = styled.footer`
  background-color: #DEB9AD;
  min-height: 100px;
  padding: 20px;
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media ${device.tablet} {
    flex-direction: row;
   
  }
`

const StyledSection = styled.div`
  padding: 20px;
  flex: 1;
`

const StyledHeading = styled.p`
  font
`
const Footer = () => {
  return (
    <StyledFooter>
      
      <StyledSection>
      <p>Project Nota</p>
        <p>
        Project Nota is a group dedicated to drawing attention
        to the Latin letters and works of famous women by focusing on the digitization of
        texts, translating these texts into English, Spanish, and French, and increasing their
        overall accessibility. Among us we have over 150 years of Latin experience including
        many years of teaching experience, seven advanced degrees, many publications in
        academic journals, and multiple positions in professional organizations.
        </p>
      </StyledSection>

      <StyledSection >
        
        <p>Project Nota &copy; 2021</p>

        <p>

          Contact Us: <StyledLink href={`mailto:${`projectnotaforwomen@gmail.com`}`}>projectnotaforwomen@gmail.com</StyledLink>
        </p>
      </StyledSection>

      <StyledSection>
        <p>Connect with Us</p>
        <SocialMedia />
      </StyledSection>
    </StyledFooter>
  );
};

export default Footer;