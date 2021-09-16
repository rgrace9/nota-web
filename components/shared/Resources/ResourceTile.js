import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react'


const ResourceTile = props => {
  
  const TitleImageContainer = styled.div`
  
  `

  const TileImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `

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
  console.log(data)
  return (
    <ResourceTileContainer onClick={handleTileClick}>
      <TitleImageContainer>
        <TileImage  src={`https://nota-database.herokuapp.com${data.image.name}`} alt="" loading="lazy" width="500" height="200" />
      </TitleImageContainer>

      <TileContent>

      <StyledHeading>
        <a target='_blank' href={data.url}>{data.title}</a>
      </StyledHeading>
 
      <p>{data.description}</p>
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
  font-size: 1.6rem !important;

  a {
    &:focus {
    outline: 0;
  }
  }
`

const ResourceTileContainer = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 20px 40px -14px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: white;
  cursor: pointer;
  &:hover, &:focus-within {
    box-shadow: 0 0 0 0.25rem;
  }
`
const StyledHeading = styled.h3`
  font-size: 2.4rem;
  font-weight: bold;
`