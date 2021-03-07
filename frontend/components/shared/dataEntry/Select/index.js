import styled from '@emotion/styled';
import React, {useState} from 'react';
import { Global, css } from '@emotion/react'

const options = [
  {
    description: 'English',
    value: 'en'
  },
  {
    description: 'Français',
    value: 'fr'
  },
  {
    description: 'Español',
    value: 'es'
  },

]

const LabelStyled = styled.label`
  white-space: nowrap;
  margin-right: 4px;
  ${(props) =>
    props.isScreenReaderOnly &&
    css`
     position:absolute;
      left:-10000px;
      top:auto;
      width:1px;
      height:1px;
      overflow:hidden;
    `}
`

const SelectStyled = styled.select`
  font-size: 16px;
`
const Select = (props) => {
  const [value, setValue] = useState(undefined)
  const {
    labelFor,
    labelTitle,
    selectOptions,
    isScreenReaderOnly
  } = props;

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <>
  <LabelStyled isScreenReaderOnly={isScreenReaderOnly} for={labelFor}>{labelTitle}</LabelStyled>
  <SelectStyled value={value} name={labelFor} id={labelFor} onChange={handleChange}>
    {options.map(opt => (
      <option value={opt.value}>{opt.description}</option>
    ))}
  </SelectStyled>
    </>
  );
};

export default Select;