import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {woodSmoke, white} from '@/styles/colors';
import Container from '../Container';
const SearchFiltersContainer = props => {
  const {title, children} = props;
  return (
    <Container justifyContent='center'>
      <StyledContainer>
        <h2>Search Filters</h2>
        <div>
          {children}
        </div>
      </StyledContainer>
    </Container>
  );
};

SearchFiltersContainer.propTypes = {
  
};

export default SearchFiltersContainer;

const StyledContainer = styled.div`
  border: 2px solid ${woodSmoke};
  width: 100%;
  padding: 20px;
  color: ${woodSmoke};
  background-color: ${white}
`