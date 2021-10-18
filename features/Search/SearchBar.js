import React, {useEffect, useRef, useState} from 'react';
import styled from '@emotion/styled';
import keys from '@/constants/keyCodes';
import {device} from '@/styles/screenSizes';
import router from 'next/router';
import {algoliaSearchIndex} from '@/lib/AlgoliaClient';
import * as colors from '@/styles/colors';
import useMouseOutside from '@/utils/hooks/useMouseOutside';
import {AuthorRow} from './ResultRow';
import { Global, css } from '@emotion/react'

const Autocomplete = () => {

  const [isVisible, setIsMenuVisible] = useState(false);
  const [results, setResults] = useState([]);
  const [text, setText] = useState('')
  const [resultsCount, setResultsCount] = useState(0)
  const [activeOptionId, setActiveOptionId] = useState(null);
  const [activeElement, setActiveElement] = useState(null);

  const textBoxRef = useRef();
  const searchContainerRef = useRef();
  
  const resetBodyAndHtml = () => {
    document.getElementsByTagName("html")[0].style.height = "initial";
    document.getElementsByTagName("html")[0].style.height = "initial";
    document.getElementsByTagName("body")[0].style.height = "initial";
    document.getElementsByTagName("body")[0].style.overflow = "initial";
  }
  const onTextBoxKeyUp = (event) => {
    switch (event.key) {
      case keys.esc:
      case keys.upArrow:
      case keys.leftArrow:
      case keys.rightArrow:
      case keys.space:
      case keys.enter:
        // if (textBoxRef.current.value) {
        //   router.push(`/search?query=${textBoxRef.current.value}`);
        // }
        break;
      case keys.tab:
        hideMenu();
        break;
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
    resetBodyAndHtml()
  }

  useMouseOutside(searchContainerRef, isVisible, hideMenu)

  const getOptionById = (id) => {
    return document.getElementById(`autocomplete_${id}`);
  }


  const getOptionIndex = (optionId) => {
    return results.findIndex(i => i.id === optionId)
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


  const onTextBoxDownPressed = async (event) => {
    let option;
    let options = [];
  
    if (text) {
      options = await getOptions(text);
    }

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
      highlightOption(option.id);
    }
  }

  const fetchSearchResults = async (userInput) => {
    try {
      const res = await algoliaSearchIndex.search(userInput).then(function(result){
        return result.hits;
        })

      return res;

    } catch(err) {

      console.error(err);
      return []
    }
  }
  const getOptions =  async (userInput) => {

    // return await fetchSearchResults(userInput);
    return (
      [
        {
            "type": "authors",
            "location": "Northern and Central Europe",
            "period": "Early Modern Period",
            "shortBiography": null,
            "date": null,
            "name": "Anna Memorata",
            "id": 5,
            "objectID": "1e9e15741c4adc_dashboard_generated_id",
            "_highlightResult": {
                "type": {
                    "value": "<em>a</em>uthors",
                    "matchLevel": "full",
                    "fullyHighlighted": false,
                    "matchedWords": [
                        "a"
                    ]
                },
                "location": {
                    "value": "Northern <em>a</em>nd Central Europe",
                    "matchLevel": "full",
                    "fullyHighlighted": false,
                    "matchedWords": [
                        "a"
                    ]
                },
                "period": {
                    "value": "Early Modern Period",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "name": {
                    "value": "<em>A</em>nna Memorata",
                    "matchLevel": "full",
                    "fullyHighlighted": false,
                    "matchedWords": [
                        "a"
                    ]
                }
            }
        },
        {
            "type": "authors",
            "location": "Italy",
            "period": "Early Modern Period",
            "shortBiography": null,
            "date": null,
            "name": "Martha Marchina (1600-1642)",
            "id": 14,
            "objectID": "85ce656fa5a5e_dashboard_generated_id",
            "_highlightResult": {
                "type": {
                    "value": "<em>a</em>uthors",
                    "matchLevel": "full",
                    "fullyHighlighted": false,
                    "matchedWords": [
                        "a"
                    ]
                },
                "location": {
                    "value": "Italy",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "period": {
                    "value": "Early Modern Period",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "name": {
                    "value": "Martha Marchina (1600-1642)",
                    "matchLevel": "none",
                    "matchedWords": []
                }
            }
        },
        {
            "type": "authors",
            "period": "Early Modern Period",
            "shortBiography": null,
            "date": null,
            "name": "Maria Hutchenson",
            "id": 4,
            "objectID": "f6f1cca81e657_dashboard_generated_id",
            "_highlightResult": {
                "type": {
                    "value": "<em>a</em>uthors",
                    "matchLevel": "full",
                    "fullyHighlighted": false,
                    "matchedWords": [
                        "a"
                    ]
                },
                "period": {
                    "value": "Early Modern Period",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "name": {
                    "value": "Maria Hutchenson",
                    "matchLevel": "none",
                    "matchedWords": []
                }
            }
        },
        {
            "type": "authors",
            "location": "Northern and Central Europe",
            "period": "Early Modern Period",
            "shortBiography": null,
            "date": null,
            "name": "Margareta van Godewijck (1627-77)",
            "id": 13,
            "objectID": "1de5c468421560_dashboard_generated_id",
            "_highlightResult": {
                "type": {
                    "value": "<em>a</em>uthors",
                    "matchLevel": "full",
                    "fullyHighlighted": false,
                    "matchedWords": [
                        "a"
                    ]
                },
                "location": {
                    "value": "Northern <em>a</em>nd Central Europe",
                    "matchLevel": "full",
                    "fullyHighlighted": false,
                    "matchedWords": [
                        "a"
                    ]
                },
                "period": {
                    "value": "Early Modern Period",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "name": {
                    "value": "Margareta van Godewijck (1627-77)",
                    "matchLevel": "none",
                    "matchedWords": []
                }
            }
        },
        {
            "type": "authors",
            "location": "Northern and Central Europe",
            "period": "Renaissance",
            "shortBiography": null,
            "date": null,
            "name": "Johanna Otho (c. 1549 - 1621)",
            "id": 3,
            "objectID": "15b73c944744d_dashboard_generated_id",
            "_highlightResult": {
                "type": {
                    "value": "<em>a</em>uthors",
                    "matchLevel": "full",
                    "fullyHighlighted": false,
                    "matchedWords": [
                        "a"
                    ]
                },
                "location": {
                    "value": "Northern <em>a</em>nd Central Europe",
                    "matchLevel": "full",
                    "fullyHighlighted": false,
                    "matchedWords": [
                        "a"
                    ]
                },
                "period": {
                    "value": "Renaissance",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "name": {
                    "value": "Johanna Otho (c. 1549 - 1621)",
                    "matchLevel": "none",
                    "matchedWords": []
                }
            }
        },
        {
            "type": "authors",
            "location": "Italy",
            "period": "Early Modern Period",
            "shortBiography": null,
            "date": null,
            "name": "Caterina Imperiale Lercari Pallavicini, Marchioness of Mombaruzzo (fl. 1721)",
            "id": 2,
            "objectID": "a874dfbd3401_dashboard_generated_id",
            "_highlightResult": {
                "type": {
                    "value": "<em>a</em>uthors",
                    "matchLevel": "full",
                    "fullyHighlighted": false,
                    "matchedWords": [
                        "a"
                    ]
                },
                "location": {
                    "value": "Italy",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "period": {
                    "value": "Early Modern Period",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "name": {
                    "value": "Caterina Imperiale Lercari Pallavicini, Marchioness of Mombaruzzo (fl. 1721)",
                    "matchLevel": "none",
                    "matchedWords": []
                }
            }
        },
        {
            "type": "authors",
            "location": "France",
            "period": "Renaissance",
            "shortBiography": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna \n",
            "date": null,
            "name": "Camille de Morel",
            "id": 6,
            "objectID": "17aa479b08fc36_dashboard_generated_id",
            "_highlightResult": {
                "type": {
                    "value": "<em>a</em>uthors",
                    "matchLevel": "full",
                    "fullyHighlighted": false,
                    "matchedWords": [
                        "a"
                    ]
                },
                "location": {
                    "value": "France",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "period": {
                    "value": "Renaissance",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "shortBiography": {
                    "value": "Lorem ipsum dolor sit <em>a</em>met, consectetur <em>a</em>dipiscing elit,Lorem ipsum dolor sit <em>a</em>met, consectetur <em>a</em>dipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna \n",
                    "matchLevel": "full",
                    "fullyHighlighted": false,
                    "matchedWords": [
                        "a"
                    ]
                },
                "name": {
                    "value": "Camille de Morel",
                    "matchLevel": "none",
                    "matchedWords": []
                }
            }
        }
    ]
    )
  };

  const onTextBoxType = async (event) => {
      // only show options if user typed something
    if (text.length > 0) {
      // get options based on value
      const options = await getOptions(text.toLowerCase());

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
    selectOption(e.currentTarget);
  };


  const onMenuKeyDown = (event, optionId) => {
    const currentElement = event.target;

    switch (event.key) {
      case keys.upArrow:
        if (getOptionIndex(optionId) === 0) {
          focusTextBox();
        }
        
        if (getOptionIndex(optionId) > 0) {
          const selectOptions = document.querySelectorAll('li.selection')
          // overflow: hidden;
          // height: 100%;
          // document.getElementsByTagName("html")[0].style.height = "hidden";
          // document.getElementsByTagName("html")[0].style.height = "100%";
          // document.getElementsByTagName("body")[0].style.height = "100%";
          // document.getElementsByTagName("body")[0].style.overflow = "hidden";
          const prevElement = selectOptions[getOptionIndex(optionId) - 1];
          prevElement.focus()
        }
        break;
      case keys.downArrow:
        if (getOptionIndex(optionId) < results.length - 1) {
          const selectOptions = document.querySelectorAll('li.selection')
          document.getElementsByTagName("html")[0].style.height = "hidden";
          document.getElementsByTagName("html")[0].style.height = "100%";
          document.getElementsByTagName("body")[0].style.height = "100%";
          document.getElementsByTagName("body")[0].style.overflow = "hidden";
          const nextElement = selectOptions[getOptionIndex(optionId) + 1];
          nextElement.focus()
        }
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
  
  const focusTextBox = () => {
    textBoxRef.current.focus();
    resetBodyAndHtml()
  }

  const setTextBoxValue = (dataValue) => {
    textBoxRef.current.value = dataValue
  }
  const selectOption = (option) => {
    const textValue = option.innerText;
    const selectedAuthorId = option.dataset.optionId;
    const selectedAuthorType = option.dataset.optionType;
    router.push(`/${selectedAuthorType}/${selectedAuthorId}`);
    setTextBoxValue(textValue);
    hideMenu();
    focusTextBox();
  }

  return (
    <SearchContainer ref={searchContainerRef}>
      <SearchBarForm className="search-box">
        <StyledFormItem>
          <StyledLabel htmlFor='search-bar'>Search transcriptions, translations, and lesson plans of women's Latin</StyledLabel>
            <StyledSearchContainer>
              <SearchInput
                id='search-bar'
                type="search"
                ref={textBoxRef}
                placeholder="Type here to search..."
                aria-controls="autocomplete-options--destination"
                autoCapitalize="none"
                autoComplete="off" 
                aria-autocomplete="list"
                role="combobox"
                aria-expanded={isVisible ? "true" : "false"}
                onKeyUp={onTextBoxKeyUp}
                onChange={handleOnTexBoxChange}
                onKeyDown={onTextBoxKeyDown}
              />
              {/* <SearchBtn aria-label='Search' type="submit" onClick={onSearch}>
                <SearchIcon />
              </SearchBtn> */}

            </StyledSearchContainer>
          </StyledFormItem>

      </SearchBarForm>
      <StyledMenu isVisible={isVisible} id="autocomplete-options--destination" role="listbox" className="hidden">
        {results.map((d) => (
          <StyledOption
            key={d.id}
            role="option"
            tabIndex={-1}
            aria-selected="false"
            data-option-value={d.name}
            data-option-id={d.id}
            data-option-type={d.type}
            id={`autocomplete_${d.id}`}
            className='selection'
            onClick={(event) => {onOptionClick(event, d.id)}}
            onKeyDown={(event) => {onMenuKeyDown(event, d.id)}}
        >
          <AuthorRow author={d['_highlightResult']} />
        </StyledOption>
        ))}
      </StyledMenu>
   
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
  position: relative;
`

const SearchBarForm = styled.div`
    position: relative;
  display: flex;
  flex-grow: 1;
`

const SearchInput = styled.input`
  width: 100%;
  position: relative;
  border: 3px solid var(--text-dark);
  padding: 5px;
  height: 42px;
  border-radius: 5px;
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

const StyledMenu = styled.ul`
  position: absolute;
  overflow-y: auto;
  margin: 0;
  max-height: 12em;
  overflow-y: auto;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  position: relative;
  font-size: 1.6rem;
  padding: 0;
  position: absolute;
  width: 100%;
  background-color: #f7fafc;
  border-radius: 0;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  z-index: 2;
  border: 2px solid #718096;
  display: none;
  transition: all 0.3s ease-in-out; 
  ${(props) => props.isVisible && css`
    display: block;
  `  }
`

const StyledOption = styled.li`
  background-color: white;
  padding: 10px 5px;
  width: 100%;
  line-height: 22px;
  padding: .5em;
  display: block;
  border-bottom: 2px solid #718096;
  margin: 0;
    &:hover {
      cursor: pointer;
      background-color: ${colors.palePeachPink}
    }
`