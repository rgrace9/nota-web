import React from 'react';
import styled from "@emotion/styled";
import { device } from "@/styles/screenSizes";
import SocialMedia from './SocialMedia';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  bottom: 0;
  width: 100%;
  font-size: 2.5rem;
  background-color: #DEB9AD;
`
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2.5rem;
  text-align: 
  
  @media ${device.tablet} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`

const StyledSectionMain = styled.div`
  padding: 0 20px;
  flex: 1;
`

const StyledSection = styled.div`
  padding: 0 20px;
  /* flex: 1; */
  max-width: 1000px;
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
      </StyledContent>
      <div>
          <SocialMedia />
      <StyledTrademark>Project Nota &copy; 2022</StyledTrademark>
      </div>
      <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>
    </StyledFooter>
  );
};

export default Footer;