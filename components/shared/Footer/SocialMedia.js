import React from 'react';
import PropTypes from 'prop-types';
import styled from "@emotion/styled";

const SOCIAL_MEDIA_LIST = [
  {
    src: '',
    href: `mailto:${`projectnotaforwomen@gmail.com`}`,
    alt: 'Project Nota Email',
    newTab: false
  }
]
const StyledContainer = styled.div`
  display: flex;
`
const StyledLink = styled.a`
    font-size: 2.0rem;
    width: 36px;
    height: 36px;
    line-height: 36px;
    display: inline-block;
    text-align: center;
    border-radius: 50%;
    margin: 0 8px;
    color: transparent;
    opacity: 0.75;

`
const SocialMedia = props => {
  return (
    <StyledContainer>
    <StyledLink href={`mailto:${`projectnotaforwomen@gmail.com`}`}>
      <img src='/contact/email.png' alt='Email Project Nota'/>
    </StyledLink>
    <StyledLink href='https://www.facebook.com/projectnota'>
      <img src='/contact/facebook.png' alt='Email Project Facebook'/>
    </StyledLink>
    
    <StyledLink href={`mailto:${`projectnotaforwomen@gmail.com`}`}>
      <img src='/contact/instagram.png' alt='Email Project Instagram'/>
    </StyledLink>
    <StyledLink href='https://twitter.com/ProjectNota'>
      <img src='/contact/twitter.png' alt='Email Project Twitter'/>
    </StyledLink>
      
    </StyledContainer>
  );
};

SocialMedia.propTypes = {
  
};

export default SocialMedia;