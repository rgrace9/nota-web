import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Global, css } from '@emotion/react'
import styled from '@emotion/styled';
import SearchIcon from '@/components/shared/Icon/ThinSearchIcon';
import useToggle from 'utils/hooks/useToggle';
import router from 'next/router';

const NavBarSearch = props => {

  const [isOn, toggleIsOn] = useToggle(false);
  const [searchText, setSearchText] = useState('')
  const [isEditing, setEditing] = useState(false);
  const toggleEditing = () => {
    setEditing(!isEditing);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing, isOn]);
  
  const handleInput = (e) => {
    setSearchText(e.target.value)
  }

  const handleSearchClick = () => {
    toggleIsOn();
    toggleEditing()
    if (isOn && searchText) {
      router.push(`/search?query=${searchText}`);
    }
  }

  return (
    <StyledContainer>
      <div className={`searchbar`}>
        <SearchButton visible={isOn} onClick={handleSearchClick}> <SearchIcon /></SearchButton>
        <StyledInput ref={inputRef} value={searchText} onChange={handleInput} visible={isOn} type="text" placeholder="search" />
      </div>
    </StyledContainer>
  );
};

NavBarSearch.propTypes = {
  
};

export default NavBarSearch;

const StyledInput = styled.input`
  border: 0;
  padding: 0;
  width: 0px;
  height: 35px;
  border-radius: 3px;
  transition: all 0.3s ease;
  ${props => props.visible && css`
  display: block;
  width: 250px;
  padding: 0 10px;
  transition: all 0.5s 0.2s ease;
  color: black;
    font-size: 1.6rem;
  `};
`
const SearchButton = styled.button`
  display: inline-block;
  border: none;
  margin: 0;
  text-decoration: none;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, 
              transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: absolute;
  top: 0;
  right: 0;

  height: 100%;

  border-radius: 3px;
  ${props => props.visible && css`
    background: #062333;
    transition: all 0.3s ease;
    position: absolute;
    top: 0;
    right: 0;
  
    height: 100%;
    padding: 5px;
    border-radius: 3px;

    transition: all 0.5s 0.3s ease;
  `}
`;
const StyledContainer = styled.div`



.searchbar{
  position: relative;
  width: 100%;
}



.searchbar .icon i{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  cursor: pointer;
}

.banner img{
  width: 100%;
  height: 350px;
}



input[type="text"].active{
  width: 250px;
  padding: 0 10px;
  transition: all 0.5s 0.2s ease;
}

@media screen and (max-width: 730px){
  .navbar{
    padding: 0px;
    flex-direction: column;
    height: 200px;
    justify-content: center;
  }
  .navbar .menu ul li{
    display: block;
    text-align: center;
    margin: 10px 0;
  }
  .searchbar .icon{
    margin-right: -20px;
  }
}
`