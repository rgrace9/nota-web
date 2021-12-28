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
import styled from '@emotion/styled';
import { truncateString } from "@/utils/truncateString";

const StyledContainer = styled.div`

label {
  font-size: 2.5rem;
}
[data-reach-listbox-arrow]  {
  margin-left: auto;
}

[data-reach-listbox-button] {
  /* max-width: 300px; */
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  background: white;
  height: 30px;
}
width: 100%;




`

const StyledListBox = styled(ListboxInput)`
  min-height: 50px;
  width: 100%;
  font-size: 2.5rem;
`

const StyledList = styled(ListboxList)`
  color: black;
  font-size: 2.5rem;
`

const ListBoxContainer = props => {
  const {labelText, options, labelValue, dataKey, allObject, onChange, value, maxOptionLength} = props;
 
  const formattedList = [
    allObject,
    ...options
  ]
  let labelId = `${labelValue}-label--id`;

    return (
      <StyledContainer>
        <label htmlFor={labelValue}>{labelText}</label>
        <StyledListBox
          aria-labelledby={labelId}
          value={value}
          id={labelValue}
          name={labelValue}
          onChange={onChange}
        >
          <ListboxButton arrow="▼" />
          <ListboxPopover>
            <StyledList>
            {formattedList.map(opt => (
              <ListboxOption key={opt.id} value={opt.id.toString()}>
                {truncateString(opt[dataKey], maxOptionLength)} 
              </ListboxOption>
            ))}
            </StyledList>
          </ListboxPopover>
        </StyledListBox>

      </StyledContainer>
    );
};

ListBoxContainer.propTypes = {
  dataKey: PropTypes.string,
  allObject: PropTypes.object,
  maxOptionLength: PropTypes.number,
};
ListBoxContainer.defaultProps = {
  dataKey: 'name',
  allObject: {},
  maxOptionLength: 30
};

export default ListBoxContainer;
