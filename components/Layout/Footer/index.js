import React from 'react';
import styled from "@emotion/styled";
import { device } from "@/styles/screenSizes";
import SocialMedia from './SocialMedia';
import StyledLink from '@/components/shared/Link/StyledLink'

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
  padding-top: 30px;
`

const StyledLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
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
          <StyledLinksContainer>
            <SocialMedia />
            <StyledLink href='https://lupercallegit.us6.list-manage.com/subscribe?u=b948a5d7e659a651269706b5d&id=3ffcf2ec16'>Join Our Newsletter</StyledLink>
            <StyledLink href='mailto:projectnotaforwomen@gmail.com'>projectnotaforwomen@gmail.com</StyledLink>
        </StyledLinksContainer>
        </StyledSection>
      </StyledContent>
      <StyledTrademark>Project Nota &copy; 2022</StyledTrademark>
      <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/" target="_blank">
        <img alt="Creative Commons License" style={{borderWidth: 0}} src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" />
      </a>
      <div>
        This work is licensed under a{" "}
        <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/" target="_blank">Creative Commons Attribution-NonCommercial 4.0 International License</a>.
      </div>
    </StyledFooter>
  );
};

export default Footer;