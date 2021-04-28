import {
  Listbox,
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from "@reach/listbox";
import "@reach/listbox/styles.css";
import React from 'react';
import PropTypes from 'prop-types';
import VisuallyHidden from "@reach/visually-hidden";
import styled from '@emotion/styled';

const StyledContainer = styled.div`

[data-reach-listbox-arrow]  {
  margin-left: auto;
}

[data-reach-listbox-button] {
  /* max-width: 300px; */
  width: 100%;
  background: white;
  height: 30px;
}
width: 100%;




`

const StyledListBox = styled(ListboxInput)`
  min-height: 50px;
  width: 100%;
`

const StyledList = styled(ListboxList)`
  color: black;

`

const ListBoxContainer = props => {
  const {labelText, options, labelValue} = props;

  let labelId = `${labelValue}-label--id`;
    let [value, setValue] = React.useState("pollo");
    return (
      <StyledContainer>
        <label for={labelValue}>{labelText}</label>
        <StyledListBox
          aria-labelledby={labelId}
          value={value}
          id={labelValue}
          name={labelValue}
          onChange={(value) => setValue(value)}
        >
          <ListboxButton arrow="▼" />
          <ListboxPopover>
            <StyledList>
            {options.map(opt => (
              <ListboxOption key={opt.id} value={opt.id}>
                {opt.name} 
              </ListboxOption>
            ))}
            </StyledList>
          </ListboxPopover>
        </StyledListBox>
      </StyledContainer>
    );
};

ListBoxContainer.propTypes = {
  
};

export default ListBoxContainer;