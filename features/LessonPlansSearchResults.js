import React from 'react';
import PropTypes from 'prop-types';
// import  {StyledUnorderedList} from '@/components/shared/List';
import styled from '@emotion/styled';
import {woodSmoke, white} from '@/styles/colors';
import Container from '@/components/shared/Container';
import Link from 'next/link';

const LessonPlansSearchResults = props => {
  const {results, loading } = props;

  console.log(results)
  return (
    <StyledContainer>
      
        <StyledUnorderedList >
        {<StyledResultsCount>{results.length || 'No' } Search Result{results.length !== 1 ? 's' : ''}</StyledResultsCount>}
          {results.map(result => (
              <ResourceTileContainer key={result.id}>
                
              <StyledTitle>
                <Link href={`/lesson-plans/${result.id}`} passHref>
                  <a>{result.title}</a>
                </Link>
                </StyledTitle>
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
  width: 100%;
  padding-bottom: 200px;
`

const StyledTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
  font-weight: 500;
  padding-top: 10px;
  font-size: 2rem;
  text-decoration: underline;
  margin-bottom: 20px;
`

const StyledDescription = styled.p`
  font-size: 1.6rem;
  padding-bottom: 30px;
`
const ResourceTileContainer = styled.li`
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
  list-style-type: initial;
  &:before {
    content:  '\\200B';
    margin-left: 0;
  };
  &:hover {
    box-shadow: 0 16px 16px 0 rgba(0,0,0,0.2);
  }

`

const StyledUnorderedList = styled.ul`
  display: flex;
  /* flex-wrap: wrap; */
  flex-direction: column;
  list-style: none;
  padding: 0;
  width: 100%;
  margin-top: 40px;
`

const StyledResultsCount = styled.h2`
  font-size: 2.4rem;
  text-align: center;
  width: 100%;
  margin-top: 40px;
  margin-bottom: 20px;
`