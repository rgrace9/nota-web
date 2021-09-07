import React from 'react';
import styled from "@emotion/styled";
import StyledLink from '@/components/shared/Link/StyledLink'
import { device } from "@/styles/screenSizes";
import SocialMedia from './SocialMedia';
import AboutUs from './AboutUs';

const StyledFooter = styled.footer`
  background-color: #DEB9AD;
  min-height: 100px;
  padding: 20px;
  bottom: 0;
  width: 100%;
  font-size: 1.6rem;
  flex-grow: 0;
`
const StyledContent = styled.footer`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  @media ${device.tablet} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`

const StyledSection = styled.div`
  padding: 0 20px;
  flex: 1;
`

const StyledHeading = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
`

const StyledTrademark = styled.div`
  text-align: center;
`
const Footer = () => {
  return (
    <StyledFooter id='footer'>
      <StyledContent>
        <StyledSection>
          <StyledHeading>Project Nota</StyledHeading>
            <p>
              Project Nota is a group dedicated to drawing attention
              to the Latin letters and works of famous women by focusing on the digitization of
              texts, translating these texts into English, Spanish, and French, and increasing their
              overall accessibility. Among us we have over 150 years of Latin experience including
              many years of teaching experience, seven advanced degrees, many publications in
              academic journals, and multiple positions in professional organizations.
            </p>
        </StyledSection>

        <StyledSection>  
          <StyledHeading>About</StyledHeading>
          <AboutUs />
        </StyledSection>

        <StyledSection>
          <StyledHeading>Connect with Us</StyledHeading>
          <SocialMedia />
      
        </StyledSection>
      </StyledContent>
      <StyledTrademark>Project Nota &copy; 2021</StyledTrademark>
    </StyledFooter>
  );
};

export default Footer;