import React from 'react';
import PropTypes from 'prop-types';
import  {StyledUnorderedList} from '@/components/shared/List';
import StyledContainer from '@/components/shared/Container/style';
import styled from '@emotion/styled';

const LessonPlansSearchResults = props => {
  const {results, loading } = props;

  return (
    <StyledContainer justifyContent='center'>
  
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