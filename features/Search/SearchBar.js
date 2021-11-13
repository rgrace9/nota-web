import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import keys from "@/constants/keyCodes";
import { device } from "@/styles/screenSizes";
import router from "next/router";
import { algoliaSearchIndex } from "@/lib/AlgoliaClient";
import * as colors from "@/styles/colors";
import useMouseOutside from "@/utils/hooks/useMouseOutside";
import ResultRow from "./ResultRow/Result";
import { Global, css } from "@emotion/react";
import Link from "next/link";

const MOCK_DATA = [
  {
      "type": "lessonPlans",
      "id": 2,
      "title": "Scansion Practice",
      "description": "Caterina Imperiale Lercari Pallavicini, Marchioness of Mombaruzzo (fl. 1721), Anna Memorata, Camille de Morel",
      "objectID": "27469840002",
      "_highlightResult": {
          "type": {
              "value": "lessonPlans",
              "matchLevel": "none",
              "matchedWords": []
          },
          "title": {
              "value": "<em>S</em>cansion Practice",
              "matchLevel": "full",
              "fullyHighlighted": false,
              "matchedWords": [
                  "s"
              ]
          },
          "description": {
              "value": "Caterina Imperiale Lercari Pallavicini, Marchioness of Mombaruzzo (fl. 1721), Anna Memorata, Camille de Morel",
              "matchLevel": "none",
              "matchedWords": []
          }
      }
  },
  {
      "type": "transcriptions",
      "id": 2,
      "title": "Responsio ad parentem meum carissimum, D(omnium) Petrum Godewyck, cum nuper ad me dedisset versus suos Latinos rhythmicos",
      "description": "Van Godewijck responds to a (lost) ‘rhythmic’ poem that her father had written to her.\nShe first recounts her joy in receiving his poem (vv. 1-8). Unfortunately, however, she\nlacks the time to properl",
      "objectID": "27469838002",
      "_highlightResult": {
          "type": {
              "value": "transcriptions",
              "matchLevel": "none",
              "matchedWords": []
          },
          "title": {
              "value": "Responsio ad parentem meum carissimum, D(omnium) Petrum Godewyck, cum nuper ad me dedisset versus <em>s</em>uos Latinos rhythmicos",
              "matchLevel": "full",
              "fullyHighlighted": false,
              "matchedWords": [
                  "s"
              ]
          },
          "description": {
              "value": "Van Godewijck responds to a (lost) ‘rhythmic’ poem that her father had written to her.\n<em>S</em>he first recounts her joy in receiving his poem (vv. 1-8). Unfortunately, however, <em>s</em>he\nlacks the time to properl",
              "matchLevel": "full",
              "fullyHighlighted": false,
              "matchedWords": [
                  "s"
              ]
          }
      }
  },
  {
      "type": "authors",
      "title": "Camille de Morel",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna \n",
      "id": 6,
      "objectID": "27469846002",
      "_highlightResult": {
          "type": {
              "value": "authors",
              "matchLevel": "none",
              "matchedWords": []
          },
          "title": {
              "value": "Camille de Morel",
              "matchLevel": "none",
              "matchedWords": []
          },
          "description": {
              "value": "Lorem ipsum dolor <em>s</em>it amet, consectetur adipiscing elit,Lorem ipsum dolor <em>s</em>it amet, consectetur adipiscing elit, <em>s</em>ed do eiusmod tempor incididunt ut labore et dolore magna \n",
              "matchLevel": "full",
              "fullyHighlighted": false,
              "matchedWords": [
                  "s"
              ]
          }
      }
  },
  {
      "type": "transcriptions",
      "id": 1,
      "title": "In creationem mundi",
      "description": "Van Godewijck celebrates God’s creation of the world, addressing him directly. He has created\nthe earth and all life that flourishes on it; his glory is everywhere (vv. 1-12). She continues with\na des",
      "objectID": "27469837002",
      "_highlightResult": {
          "type": {
              "value": "transcriptions",
              "matchLevel": "none",
              "matchedWords": []
          },
          "title": {
              "value": "In creationem mundi",
              "matchLevel": "none",
              "matchedWords": []
          },
          "description": {
              "value": "Van Godewijck celebrates God’<em>s</em> creation of the world, addressing him directly. He has created\nthe earth and all life that flourishes on it; his glory is everywhere (vv. 1-12). <em>S</em>he continues with\na des",
              "matchLevel": "full",
              "fullyHighlighted": false,
              "matchedWords": [
                  "s"
              ]
          }
      }
  }
]

const Autocomplete = () => {
  const [isVisible, setIsMenuVisible] = useState(false);
  const [results, setResults] = useState([]);
  const [text, setText] = useState("");
  const [resultsCount, setResultsCount] = useState(0);
  const [activeOptionId, setActiveOptionId] = useState(null);
  const [activeElement, setActiveElement] = useState(null);

  const textBoxRef = useRef();
  const searchContainerRef = useRef();

  const resetBodyAndHtml = () => {
    document.getElementsByTagName("html")[0].style.height = "initial";
    document.getElementsByTagName("html")[0].style.height = "initial";
    document.getElementsByTagName("body")[0].style.height = "initial";
    document.getElementsByTagName("body")[0].style.overflow = "initial";
  };

  const freezeBodyAndHtml = () => {
    document.getElementsByTagName("html")[0].style.height = "hidden";
    document.getElementsByTagName("html")[0].style.height = "100%";
    document.getElementsByTagName("body")[0].style.height = "100%";
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
  };
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
  };

  const showMenu = () => {
    setIsMenuVisible(true);
  };

  const buildMenu = (options) => {
    setResults(options);
    setResultsCount(options.length);
  };

  const hideMenu = () => {
    setIsMenuVisible(false);
    resetBodyAndHtml();
  };

  const onTextBoxFocus = (event) => {
    if (text && resultsCount) {
      showMenu();
    }
  };
  useMouseOutside(searchContainerRef, isVisible, hideMenu);

  const getOptionById = (id) => {
    return document.getElementById(`autocomplete_${id}`);
  };

  const getOptionIndex = (optionId) => {
    return results.findIndex((i) => i.id === optionId);
  };
  const highlightOption = (optionId) => {
    // if there’s a currently selected option
    const currentOption = getOptionById(optionId);

    if (activeOptionId) {
      // get the option
      let activeOption = getOptionById(activeOptionId);

      activeOption.setAttribute("aria-selected", "false");
    }
    currentOption.setAttribute("aria-selected", "true");

    currentOption.focus();
  };

  const getFirstOption = () => {
    return results[0];
  };

  const onTextBoxDownPressed = async (event) => {
    let option;
    let options = [];

    if (text) {
      options = await getOptions(text);
    }

    // if there are options
    if (options.length > 0) {
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
  };

  const fetchSearchResults = async (userInput) => {
    try {
      const res = await algoliaSearchIndex
        .search(userInput)
        .then(function (result) {
          return result.hits;
        });
      console.log("RES", res);
      
      return res;
    } catch (err) {
      console.error(err);
      return [];
    }
  };
  const getOptions = async (userInput) => {
    // return await fetchSearchResults(userInput);
    setResultsCount(MOCK_DATA.length);
    return MOCK_DATA;
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
  };

  const handleOnTexBoxChange = (event) => {
    setText(event.target.value);
  };

  const onTextBoxKeyDown = (event) => {
    switch (event.key) {
      case keys.tab:
        setIsMenuVisible(false);
    }
  };

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
          const selectOptions = document.querySelectorAll("li.selection");
          // overflow: hidden;
          // height: 100%;
          freezeBodyAndHtml();
          const prevElement = results[getOptionIndex(optionId) - 1];
          highlightOption(prevElement.id);
        }
        break;
      case keys.downArrow:
        if (getOptionIndex(optionId) < results.length - 1) {
          const selectOptions = document.querySelectorAll("li.selection");
          freezeBodyAndHtml();
          const nextSelectOption = results[getOptionIndex(optionId) + 1];
          highlightOption(nextSelectOption.id);
        }
        break;
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
    resetBodyAndHtml();
  };

  const setTextBoxValue = (dataValue) => {
    textBoxRef.current.value = dataValue;
  };
  const selectOption = (option) => {
    const textValue = option.innerText;
    const selectedAuthorId = option.dataset.optionId;
    const selectedAuthorType = option.dataset.optionType;
    router.push(`/${selectedAuthorType}/${selectedAuthorId}`);
    setTextBoxValue(textValue);
    hideMenu();
    focusTextBox();
  };

  return (
    <SearchContainer ref={searchContainerRef}>
      <SearchBarForm className="search-box">
        <StyledFormItem>
          <StyledLabel htmlFor="search-bar">
            Search transcriptions, translations, and lesson plans of women's
            Latin
          </StyledLabel>
          <StyledSearchContainer>
            <SearchInput
              id="search-bar"
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
              onFocus={onTextBoxFocus}
            />
            {/* <SearchBtn aria-label='Search' type="submit" onClick={onSearch}>
                <SearchIcon />
              </SearchBtn> */}
          </StyledSearchContainer>
        </StyledFormItem>
      </SearchBarForm>
      <StyledMenu
        isVisible={isVisible}
        id="autocomplete-options--destination"
        role="listbox"
        className="hidden"
      >
        {results.map((d) => (
          <li key={`${d.id}-${d.type}`} className="selection">
            <Link href={`${d.type}/${d.id}`} passHref>
              <StyledOption
                tabIndex={-1}
                aria-selected="false"
                data-option-value={d.name}
                data-option-id={d.id}
                data-option-type={d.type}
                id={`autocomplete_${d.id}`}
                className="selection"
                // onClick={(event) => {onOptionClick(event, d.id)}}
                onKeyDown={(event) => {
                  onMenuKeyDown(event, d.id);
                }}
                href={`${d.type}/${d.id}`}
              >
                <ResultRow
                  description={d['_highlightResult'].description?.value}
                  title={d['_highlightResult'].title.value}
                  type={d['_highlightResult'].type.value}
                />
              </StyledOption>
            </Link>
          </li>
        ))}
      </StyledMenu>

      <div aria-live="polite" role="status" className="sr-only">
        {resultsCount || "No"} result{resultsCount !== 1 ? "s" : ""} available.
      </div>
    </SearchContainer>
  );
};

Autocomplete.propTypes = {};

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
`;

const StyledSearchContainer = styled.span`
  display: flex;
`;

const SearchContainer = styled.div`
  width: 100%;
  position: relative;
`;

const SearchBarForm = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
`;

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
`;

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
`;

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
  ${(props) =>
    props.isVisible &&
    css`
      display: block;
    `}
`;

const StyledListItem = styled.li``;

const StyledOption = styled.a`
  background-color: white;
  padding: 10px 5px;
  width: 100%;
  line-height: 22px;
  padding: 0.5em;
  display: block;
  border-bottom: 2px solid #718096;
  margin: 0;
  &:hover {
    cursor: pointer;
    background-color: ${colors.palePeachPink};
  }
`;
