import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react'


const ResourceTile = props => {
  const [isMounted, setIsMounted] = useState(false);

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
    <ResourceTileContainer class="card reorder" onClick={handleTileClick}>
      <TileImage className='card__image' src="https://assets.codepen.io/282691/man-landscape-unsplash.jpg" alt="" loading="lazy" width="500" height="200" />

      <TileContent>

      <h3>
        <a target='_blank' href="https://www.google.com">Card title here</a>
      </h3>

      <p>Some text, just a line to make up some description&hellip;</p>
      </TileContent>

  </ResourceTileContainer>
  );
};

ResourceTile.propTypes = {
  
};

export default ResourceTile;

const TileContent = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 1rem;
  color: var(--text-dark);
  height: 120px;
  a {
    &:focus {
    outline: 2px solid var(--text-dark);
  }
  }
`
const TileImage = styled.img`

height: auto;
background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
 
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

`
const ResourceTileContainer = styled.article`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 20px 40px -14px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    box-shadow: 0 16px 16px 0 rgba(0,0,0,0.2);
  }

`


