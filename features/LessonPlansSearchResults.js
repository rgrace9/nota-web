import React from 'react';
import PropTypes from 'prop-types';
// import  {StyledUnorderedList} from '@/components/shared/List';
import styled from '@emotion/styled';
import {woodSmoke, white} from '@/styles/colors';
import Container from '@/components/shared/Container'
const LessonPlansSearchResults = props => {
  const {results, loading } = props;

  return (
    <StyledContainer>
      
        <StyledUnorderedList >
          {results.map(result => (
              <ResourceTileContainer key={result.id}>
                
              <StyledTitle>{result.title}</StyledTitle>
              <StyledDescription>{result.description}</StyledDescription>
              </ResourceTileContainer>
          ))}
          </StyledUnorderedList>

    </StyledContainer>
  );
};

LessonPlansSearchResults.propTypes = {
  results: PropTypes.array,
  loading: PropTypes.bool,
};

export default LessonPlansSearchResults;

const StyledContainer = styled.div`
  /* border: 2px solid ${woodSmoke}; */
  display: flex;
  width: 100%;
  margin: 30px;
  max-width: 1500px;
  width: 100%;
  flex-direction
  /* padding: 20px; */
  /* color: ${woodSmoke};
  background-color: ${white}; */
  justify-content: center;
`

const StyledTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
`

const StyledDescription = styled.p`
  font-size: 1.6rem;
`
const ResourceTileContainer = styled.div`
  box-shadow: 0 8px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  margin-bottom: 20px;
  background-color: white;
  box-shadow: 0 20px 40px -14px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: white;
  cursor: pointer;
  width: 100%;
  border: solid 2px black;
  padding: 10px 30px;
  width: 100%;
  padding: 20px;
  &:hover {
    box-shadow: 0 16px 16px 0 rgba(0,0,0,0.2);
  }

`

const StyledUnorderedList = styled.ul`
  display: flex;
  width: 100%;
  margin: 30px;
  flex-direction: column;
  @media (min-width: 768px) {
    /* screen width is less than 768px (medium) */
    /* margin: 100px  ; */
    padding: 10px 20px;
  }
  @media (min-width: 1024px) {
    /* margin: 0  auto; */
    padding: 10px 20px;
  }
  @media (min-width: 1200px) {
    /* margin: 0  auto; */
    margin: 0px 100px;

  }
li {
  list-style-type: ${(props = true) =>
    props.bulletPoints ? 'initial' :  'none'};
  &:before {
    content: ${(props) =>
    props.bulletPoints ? 'initial' :  '\\200B'};
  };
  margin-left: ${(props) =>
    props.indent ? props.indent :  '0'};
}`

