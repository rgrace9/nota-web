import React, {useRef, useState, KeyboardEvent} from 'react';
import { Global, css } from '@emotion/react'
import styled from '@emotion/styled';
import keys from '@/constants/keyCodes';
import SearchIcon from '../../components/shared/Icon/ThinSearchIcon';
import {device} from '@/styles/screenSizes';


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

const Autocomplete = () => {

  const [isVisible, setIsMenuVisible] = useState(false);
  const [results, setResults] = useState([]);
  const [text, setText] = useState('')
  const [resultsCount, setResultsCount] = useState(0)
  const [activeOptionId, setActiveOptionId] = useState(null);

  const textBoxRef = useRef();

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

  const showMenu = () => {
    setIsMenuVisible(true)
  }

  const buildMenu = (options) => {
    setResults(options)
    setResultsCount(options.length)
  }

  const hideMenu = () => {
    setIsMenuVisible(false);
    setResults([])
    setResultsCount(0)
  }

  const getOptionById = (id) => {
    return document.getElementById(`autocomplete_${id}`);
  }


  const highlightOption = (optionId) => {
    // if there’s a currently selected option
    const currentOption = getOptionById(optionId);
    
    if(activeOptionId) {
  
      // get the option
      let activeOption = getOptionById(activeOptionId);
   
      activeOption.setAttribute('aria-selected', 'false');

    }
    currentOption.setAttribute('aria-selected', 'true')

    currentOption.focus()
  };

  const getFirstOption = () => {
    return results[0];
  }

  const isExactMatch = (userInput) => {
    EXAMPLE_DATA.find(d => d.name.toLowerCase() === userInput.toLowerCase())
  }

  const getAllOptions = () => {
    return EXAMPLE_DATA;
  }
  const onTextBoxDownPressed = (event) => {
    let option;
    let options;
  
    /*
      When the value is empty or if it exactly
      matches an option show the entire menu
    */
    if(text.length === 0 || isExactMatch(text)) {
  
      // get options based on the value
      options = getAllOptions();
  
      // build the menu based on the options
      buildMenu(options);
  
      // show the menu
      showMenu();
  
      // retrieve the first option in the menu
      option = getFirstOption();
  
  
      // highlight the first option
      console.log('HERE OPTION 136', option)
      highlightOption(option);
  
    /*
      When there’s a value that doesn’t have
      an exact match show the matching options
    */
    } else {
  
      // get options based on the value
      options = getOptions(text);
  
      // if there are options
      if(options.length > 0) {
  
        // build the menu based on the options
        buildMenu(options);
  
        // show the menu
        showMenu();
        // debugger;
        // retrieve the first option in the menu
        option = getFirstOption();
  
        // highlight the first option
        console.log('HERE OPTION 161', option)
        highlightOption(option.id);
      }
    }
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
      // console.log(textBoxRef.current)
    if (text.length > 0) {
      // get options based on value
      const options = getOptions(text.toLowerCase());
      console.log(options)
      setResults(options);
      // build the menu based on the options
      buildMenu(options);

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



  const onOptionClick = (e) => {
    selectOption(e.target);
  };


  const onMenuKeyDown = (event, optionId) => {
    const currentElement = event.target;
    console.log('focus?', currentElement.matches(':focus'))
    switch (event.key) {
      case keys.upArrow:
        break;
      case keys.downArrow:
        highlightOption(optionId);
        break
      case keys.leftArrow:
      case keys.rightArrow:
      case keys.space:
        selectOption(currentElement);
        break;
      case keys.enter:
        selectOption(currentElement);
        break;
      case keys.tab:
      case keys.shift:
        // ignore otherwise the menu will show
        break;
      default:
        onTextBoxType(event);
    }
  };

  const onOptionKeyPress = (e) => {
    const {key} = e;
    if (key === keys.enter || key === keys.space) {
      selectOption(e.target);
    } else {

    }
  }

  const createMenu = () => {

  }
  
  const focusTextBox = () => {
    textBoxRef.current.focus()
  }

  const setTextBoxValue = (dataValue) => {
    textBoxRef.current.value = dataValue
  }
  const selectOption = (option) => {
    const textValue = option.innerText
    setTextBoxValue(textValue);
    hideMenu();
    focusTextBox();
  }

  const onSearch = (e) => {
    e.preventDefault();
    console.log('search')
  }

  return (
    <SearchContainer>
    
      <SearchBarForm onSubmit={onSearch} className="search-box">

        <StyledFormItem>
          <StyledLabel htmlFor='search-bar'>Search transcriptions, translations, and lesson plans of women's Latin</StyledLabel>
            <StyledSearchContainer>
              <SearchInput
                id='search-bar'
                // type="search"
                ref={textBoxRef}
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
                <SearchIcon />
              </SearchBtn>

            </StyledSearchContainer>
          </StyledFormItem>

      </SearchBarForm>
      {isVisible && (
      <ul id="autocomplete-options--destination" role="listbox" className="hidden">
        {results.map((d) => (
          <li
            key={d.id}
            role="option"
            tabIndex={-1}
            aria-selected="false"
            data-option-value={d.name}
            id={`autocomplete_${d.id}`}
            className='selection'
            onClick={(event) => {onOptionClick(event, d.id)}}
            onKeyDown={(event) => {onMenuKeyDown(event, d.id)}}
        >
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

Autocomplete.propTypes = {
  
};

export default Autocomplete;

const StyledFormItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  color: var(--text-dark);
  font-weight: bold;
  font-size: 2.8rem;
  display: block;
  @media ${device.tablet} {
    font-size: 3.6rem;
  }
`

const StyledSearchContainer = styled.span`
  display: flex;
`;

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