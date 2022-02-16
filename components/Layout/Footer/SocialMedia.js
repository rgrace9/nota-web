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
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 400px;
  margin: auto;
`
const StyledLink = styled.a`
  font-size: 2.0rem;
  width: 36px;
  height: 36px;
  line-height: 36px;
  display: inline-block;
  text-align: center;
  margin: 0 8px;
  color: transparent;
  padding: 2px;
  border: solid 1px transparent;
  &:hover {
    border: solid 1px black;
  }
  img {
    height: 28px;
    width: 28px;
  }
`
const SocialMedia = props => {
  return (
    <StyledContainer>
    <StyledLink href='https://www.facebook.com/projectnota' target='_blank' rel='noopener'>
      <img src='/contact/facebook.png' alt='Email Project Facebook'/>
    </StyledLink>
    
    <StyledLink href='https://www.instagram.com/projectnota/' target='_blank' rel='noopener'>
      <img src='/contact/instagram.png' alt='Email Project Instagram'/>
    </StyledLink>
    <StyledLink href='https://twitter.com/ProjectNota' target='_blank' rel='noopener'>
      <img src='/contact/twitter.png' alt='Email Project Twitter'/>
    </StyledLink>
      
    </StyledContainer>
  );
};

SocialMedia.propTypes = {
  
};

export default SocialMedia;