import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react'
import Link from 'next/link';

const HeroImage = props => {
  const {
    imageUrl,
    heroTitle,
    heroSubtitle,
    href,
    linkTitle
  } = props;
  return (
    <HeroImageContainer imageUrl={imageUrl}>
      <HeroTextContainer>
        <HeroTitle>{heroTitle}</HeroTitle>
        <HeroSubtitle>{heroSubtitle}</HeroSubtitle>

        {(href && linkTitle) ? (
          <section>

          <Link href={href}>
          <a className='hero-link'>{linkTitle}</a>
          </Link>
          </section>
        ) : null}
      </HeroTextContainer>
    </HeroImageContainer>
  );
};

HeroImage.propTypes = {
  imageUrl: PropTypes.string,
  heroTitle: PropTypes.string,
  heroSubtitle: PropTypes.string,
};

HeroImage.defaultProps = {
  imageUrl: '/images/cassone_wedding.jpeg',
  heroTitle: 'Lorem Ipsum'
};

export default HeroImage;

const HeroImageContainer = styled.div`
  ${(props) => css`background-image: url(${props.imageUrl})` }
  height: 500px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`

const HeroTextContainer = styled.div`
  background-color: hsla(0, 0%, 100%, 0.55);
  text-align: left;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  display: flex;
  flex-direction: column;
  .hero-link {
    position: relative;
  color: white;
  text-decoration: none;
  cursor: pointer;
  text-transform: capitalize;
  color: var(--text-dark);
  white-space: nowrap;
  padding: 2px;
  /* &::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    bottom: -2px;
    height: 2px;
    width: 100%auto;
    background: var(--text-dark);
    transition: width 150ms linear;
  } */
  outline: 1px solid var(--text-dark);

  &:focus {
    outline: 2px solid var(--text-dark);
  }
  &:hover {
    outline: 2px solid black;

  }
  }
  
`
const HeroTitle = styled.h1`
  color: var(--text-dark);
  font-size: 42px;
`

const HeroSubtitle = styled.p`
  color: var(--text-dark);
  font-size: 24px;
  
`

const HeroLink = styled.a`

`