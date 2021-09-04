import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {woodSmoke, white} from '@/styles/colors';
import Container from '../Container';
const SearchFiltersContainer = props => {
  const {title, children, loading} = props;
  return (
    <Container justifyContent='center'>
      <StyledContainer>
        <StyledSubheading>{title}</StyledSubheading>
        {loading ? (
          <p>Loading...</p>
        ) : (
        <div>
          {children}
        </div>
        )}
      </StyledContainer>
    </Container>
  );
};
SearchFiltersContainer.defaultProps = {
  title: 'Search Filters'
}
SearchFiltersContainer.propTypes = {
  title: PropTypes.string
};

export default SearchFiltersContainer;

const StyledContainer = styled.div`
  border: 2px solid ${woodSmoke};
  width: 100%;
  padding: 20px;
  color: ${woodSmoke};
  background-color: ${white};
`
const StyledSubheading = styled.h2`
  font-size: 28px;
`