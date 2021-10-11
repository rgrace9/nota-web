
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import SearchIcon from '../../components/shared/Icon/ThinSearchIcon';
import {device} from '@/styles/screenSizes';
import Autocomplete from './Autocomplete';
import React, {useRef, useState, KeyboardEvent} from 'react';
import keys from '@/constants/keyCodes';


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

const SearchBar = props => {

  const onSearch = (e) => {
    e.preventDefault();
    console.log('search')
  }
  const [isVisible, setIsMenuVisible] = useState(false);
  const [results, setResults] = useState([]);
  const [text, setText] = useState('')
  const [resultsCount, setResultsCount] = useState(0)
  const onTextBoxKeyUp = (event) => {
    switch (event.key) {
      case keys.esc:
      case keys.upArrow:
      case keys.leftArrow:
      case keys.rightArrow:
      case keys.space:
      case keys.enter:
      case keys.tab:
      case keys.shift:
        // ignore otherwise the menu will show
        break;
      case keys.downArrow:
        onTextBoxDownPressed(event);
        break;
      default:
        onTextBoxType(event);
    }
  }

  const onTextBoxDownPressed = (event) => {
    console.log('onTextBoxDownPressed')
  }

  const getOptions = (userInput) => {

    let matches = [];
  
    // Loop through each of the option elements
    EXAMPLE_DATA.forEach(function(i, el) {
  
      // if the option has a value and the option’s text node matches the user-typed value
      if(i.name.trim().length > 0 && i.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1) {
  
        // push an object representation to the matches array
        matches.push({ name: i.name, id: i.id });
      }
    });
  
    return matches;
  };

  const onTextBoxType = (event) => {
      // only show options if user typed something
      console.log('text', text)
    if (text.length > 0) {
      // get options based on value
      const options = getOptions(text.toLowerCase());
      console.log(options)
      setResults(options);
      // build the menu based on the options
      // buildMenu(options);

      // show the menu
      setIsMenuVisible(true);

      // update the live region
      setResultsCount(options.length);
  } else {
    setResults([]);
    setResultsCount(0);
  }

  // update the select box value which
  // the server uses to process the data
    // updateSelectBox();
  }

  const handleOnTexBoxChange = (event) => {
    setText(event.target.value)
  }

  const onTextBoxKeyDown = (event) => {
    switch (event.key) {
      case keys.tab:
        setIsMenuVisible(false);
    }
  }

  const createMenu = () => {

  }

  const onOptionClick = () => {
    // var option = $(e.currentTarget);
    // this.selectOption(option);
  };

  return (
    <SearchContainer>
      <HeadingStyle>Search transcriptions, translations, and lesson plans of women's Latin</HeadingStyle>
      
        <SearchBarForm onSubmit={onSearch} className="search-box">
          <label className='sr-only' htmlFor='search-bar'>Search transcriptions, translations, and lesson plans of women&#39;s Latin</label>
          <SearchInput
            id='search-bar'
            // type="search"
            placeholder="Type here to search..."
            aria-controls="autocomplete-options--destination"
            autoCapitalize="none"
            type="text"
            autoComplete="off" 
            aria-autocomplete="list"
            role="combobox"
            aria-expanded={isVisible ? "true" : "false"}
            onKeyUp={onTextBoxKeyUp}
            onChange={handleOnTexBoxChange}
            onKeyDown={onTextBoxKeyDown}
          />
          <SearchBtn aria-label='Search' type="submit">
            {/* <Autocomplete /> */}
        <SearchIcon />
     </SearchBtn>

        </SearchBarForm>
        {isVisible && (
        <ul id="autocomplete-options--destination" role="listbox" className="hidden">
          {results.map(d => (
            <li key={d.id} role="option" tabIndex={-1} aria-selected="false" data-option-value={d.id} id={`autocomplete_${d.id}`}>
              {d.name}
            </li>
          ))}
        </ul>
      )}
        <div aria-live="polite" role="status" className="sr-only">
        {resultsCount || 'No'} result{resultsCount !== 1 ? 's' : '' } available.
        </div>
    </SearchContainer>
  );
};

SearchBar.propTypes = {
  
};

export default SearchBar;

const HeadingStyle = styled.h2`
  color: var(--text-dark);
  font-weight: bold;
  font-size: 2.8rem;
  @media ${device.tablet} {
    font-size: 3.6rem;
  }
`

const SearchContainer = styled.div`
  width: 100%;

`

const SearchBarForm = styled.form`
    position: relative;
  display: flex;
  flex-grow: 1;
`

const SearchInput = styled.input`
  width: 100%;

  border: 3px solid var(--text-dark);
  border-right: none;
  padding: 5px;
  height: 42px;
  border-radius: 5px 0 0 5px;
  color: var(--text-dark);
  font-size: 2.4rem;

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  appearance: none;
  }
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