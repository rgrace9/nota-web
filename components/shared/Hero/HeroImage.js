import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react'
import Link from 'next/link';
import SearchBar from '@/features/Search/SearchBar'
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
        {/* <HeroTitle>Search Projec</HeroTitle> */}
        <SearchBar />
        <div style={{marginTop: '30px', marginBottom: '30px'}}>
        <hr />  

        </div>
        <div>
        {/* <HeroSubtitle>{heroSubtitle}</HeroSubtitle> */}
        <HeroSubtitle>Project Nota draws attention (nota bene!) to the letters and works (nota) of famous women (notarum) by focusing on the digitization of texts, translating these texts into English, and increasing their overall accessibility.</HeroSubtitle>
          

          {(href && linkTitle) ? (
            <section>

            <Link href={href}>
            <a className='hero-link'>{linkTitle}</a>
            </Link>
            </section>
          ) : null}

        </div>
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
  font-size: 1.6rem;
  max-width: 700px;

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
  font-size: 4.2rem;
`

const HeroSubtitle = styled.p`
  color: var(--text-dark);
  font-size: 2rem;
  
`

const HeroLink = styled.a`

`