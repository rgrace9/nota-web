import styled from '@emotion/styled';
import React from 'react';

const HeadingStyle = styled.h1`
  color: #1a0404;
`


const Search = () => {
  return (
    <div style={{height: '200px'}}>
      <HeadingStyle>Search</HeadingStyle>
    </div>
  );
};

export default Search;