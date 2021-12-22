import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react'
import Link from 'next/link';
import SearchBar from '@/features/Search/SearchBar';
import {device} from '@/styles/screenSizes';

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
        <SearchBar />
        <HeroSecondaryInfo>
          <div style={{marginTop: '30px', marginBottom: '30px'}}>
          <hr />  

          </div>
        <HeroSubtitle>Project Nota draws attention (nota bene!) to the letters and works (nota) of famous women (notarum) by focusing on the digitization of texts, translating these texts into English, and increasing their overall accessibility.</HeroSubtitle>
          

          {(href && linkTitle) ? (
            <section>

            <Link href={href}>
              <a className='hero-link'>{linkTitle}</a>
            </Link>
            </section>
          ) : null}

        </HeroSecondaryInfo>
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
  overflow-y: scroll;
`

const HeroTextContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  font-size: 2.5rem;
  width: 100%;
  background-color: hsla(0, 0%, 100%, 0.55);

  @media ${device.tablet} {
    max-width: 700px;
    text-align: left;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-x: hidden;
  }

  .hero-link {
    position: relative;
  color: white;
  text-decoration: none;
  cursor: pointer;
  text-transform: capitalize;
  color: var(--text-dark);
  white-space: nowrap;
  padding: 2px;
  border: 1px solid var(--text-dark);
  
  }
  
`
const HeroTitle = styled.h1`
  color: var(--text-dark);
  font-size: 4.4rem;
`

const HeroSubtitle = styled.p`
  color: var(--text-dark);
  font-size: 2.5rem;
  
`

const HeroLink = styled.a`

`

const HeroSecondaryInfo = styled.div`
  display: none;
  @media ${device.tablet} {
    display: block;
  }
`