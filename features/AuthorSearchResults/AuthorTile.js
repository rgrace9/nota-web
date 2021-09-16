import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react'
import Link from 'next/link';
import { device } from "@/styles/screenSizes";


const ResourceTile = props => {
  const [isMounted, setIsMounted] = useState(false);
  const {data} = props;
  const handleTileClick = (e) => {
    const link = document.querySelector('h3 a');
    if (link && isMounted) {
      link.click();
    }
  }

  
  useEffect(() => {
    // window is accessible here.
    // console.log("window.innerHeight", window.innerHeight);
    setIsMounted(true)

  }, []);

  return (
    <ResourceTileContainer onClick={handleTileClick}>
      <TileImage  src="/images/pompeii_fresco.jpeg" alt="" loading="lazy" width="500" height="200" />

      <TileContent>

      <StyledTitle>
        <Link href={`/authors/${data.id}`}>
          <a>{data.name}</a>
        </Link>
      </StyledTitle>

      <p>{data.shortBio}</p>
      </TileContent>

  </ResourceTileContainer>
  );
};

ResourceTile.propTypes = {
  
};

export default ResourceTile;

const StyledTitle = styled.h3`
  font-weight: 500;
  padding-top: 10px;
  font-size: 2rem;
  text-decoration: underline;
  margin-bottom: 20px;
`
const TileContent = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  color: var(--text-dark);
  height: 120px;
  font-size: 1.6rem;
  position: relative;
  line-height: 1;

  a {
    &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
}`

const TileImage = styled.div`
  background-image: url('/images/pompeii_fresco.jpeg');
  height: auto;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: none;
  margin-right: 0px;
  border-top-right-radius: 0.25rem;
  flex-direction: row;
  min-width: 300px;
  overflow: hidden;
  position: relative;
  transition: filter 0.5s cubic-bezier(.43,.41,.22,.91);;
  &::before {
    content: "";
	  display: block;
    padding-top: 56.25%; // 16:9 aspect ratio
  }
  @media(min-width: 40rem) {
    &::before {
      padding-top: 66.6%; // 3:2 aspect ratio
    }
  }

  @media ${device.tablet} {
    display: flex;
    margin-right: 15px;
  }
`
const ResourceTileContainer = styled.div`
  box-shadow: 0 8px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  margin-bottom: 20px;
  background-color: white;
  box-shadow: 0 20px 40px -14px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: row;
  overflow: hidden;
  background: white;
  cursor: pointer;
  width: 100%;
  border: solid 2px black;
  &:hover {
    box-shadow: 0 16px 16px 0 rgba(0,0,0,0.2);
  }

`


