import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import { Global, css } from '@emotion/react'
import styled from '@emotion/styled';

const EXAMPLE_DATA = [
  {
    name: 'America',
    id: '1'
  },
  {
    name: 'Spain',
    id: '2'
  },
  {
    name: 'France',
    id: '3'
  },
  {
    name: 'Germany',
    id: '4'
  },
]

const SearchPage = props => {
  const {
    searchValue
  } = props;
  const [searchText, setSearchText] = useState(searchValue)

  const inputRef = useRef(null);

  useEffect(() => {
    // console.log(searchValue)
    setSearchText(searchValue)
  }, [searchValue])

  const handleInput = (e) => {
    setSearchText(e.target.value)

  }
  const handleSearchClick = () => {

  }

  return (
    <div style={{minHeight: '75vh'}}>
              <form onSubmit={handleSearchClick}>
          <label htmlFor='nav-bar-search' className='sr-only'>Search</label>
          <StyledInput htmlFor='nav-bar-search' ref={inputRef} value={searchText} onChange={handleInput} type="text" placeholder="Search" />
          <ul>
            {EXAMPLE_DATA.map(item => (
              <li key={item.id}>
                {item.name}
              </li>
            ))}
          </ul>
        </form>
    </div>
  );
};

SearchPage.propTypes = {
  
};

export default SearchPage;

const StyledInput = styled.input`
  border-radius: 3px;
  transition: all 0.3s ease;
  color: black;
  font-size: 1.6rem;
  display: block;
  min-width: 450px;
  border: 1px solid;
  padding: 10px 10px;
  transition: all 0.5s 0.2s ease;

  &:focus {
    /* outline: none; */
  box-shadow: 0.2rem 0.8rem 1.6rem black;
  }
`
