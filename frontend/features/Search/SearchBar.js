import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import SearchIcon from '../../components/shared/Icon/ThinSearchIcon';

const SearchBar = props => {

  const onSearch = (e) => {
    e.preventDefault();
    console.log('search')
  }
  return (
    <SearchContainer>
      <HeadingStyle>Search</HeadingStyle>
      <form onSubmit={onSearch} class="search-box">
        <SearchBarContainer>
          <SearchInput type="search" placeholder="Type here to search..." />
          <SearchBtn aria-label='Search' type="submit">
        <SearchIcon />
     </SearchBtn>

        </SearchBarContainer>
    </form>
    </SearchContainer>
  );
};

SearchBar.propTypes = {
  
};

export default SearchBar;

const HeadingStyle = styled.h2`
  color: var(--text-dark);
  font-size: 32px;

`

const SearchContainer = styled.div`
  width: 100%;

`

const SearchBarContainer = styled.div`
    position: relative;
  display: flex;
  flex-grow: 1;
`

const SearchInput = styled.input`
  width: 100%;
  max-width: 800px;
  
  border: 3px solid var(--text-dark);
  border-right: none;
  padding: 5px;
  height: 42px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: var(--text-dark);
  font-size: 24px;
`

const SearchBtn = styled.button`
    /* width: 40px; */
  width: 50px;
  height: 42px;
  padding: 4px;
  border: 1px solid var(--text-dark);
  background: var(--text-dark);
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;


`