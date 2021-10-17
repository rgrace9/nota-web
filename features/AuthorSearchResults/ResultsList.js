import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react'
import ResourceTile from './AuthorTile';
const ResultsList = props => {
  const {results, loading, noResultsMessage} = props;

  return (

      <StyledSection aria-live="polite" aria-busy={loading ? "true" : "false"}>
        {(loading && !results.length) ? (
          <p>Loading...</p>
        ) : (
          <>
            {<StyledTitle>{results.length || 'No' } Search Result{results.length !== 1 ? 's' : ''}</StyledTitle>}
            {results.length && (
              <ResourcesListContainer>
                {results.map(r => (
                  <ResourceItem key={r.id}>
                    
                    <ResourceTile key={r} data={r}/>
                  </ResourceItem>
                ))}
              </ResourcesListContainer>
            )}
          </>
        )}
      </StyledSection>
 
  );
};

ResultsList.defaultProps = {
  noResultsMessage: 'No Results Found'
};
ResultsList.propTypes = {
  noResultsMessage: PropTypes.string
};

const StyledTitle = styled.h2`
  font-size: 2.4rem;
  text-align: center;
  width: 100%;
`

const StyledSection = styled.section`
  width: 100%;
  padding-bottom: 200px;
`
const ResourcesListContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  width: 100%;
`

const ResourceItem = styled.li`
  display: flex;
  width: 100%;
`

export default ResultsList;