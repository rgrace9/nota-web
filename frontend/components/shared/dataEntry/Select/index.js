import styled from '@emotion/styled';
import React, {useState} from 'react';

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
    description: 'Española',
    value: 'es'
  },

]

const LabelStyled = styled.label`
  white-space: nowrap;
  margin-right: 4px;
`

const SelectStyled = styled.select`
  font-size: 16px;
`
const Select = (props) => {
  const [value, setValue] = useState(undefined)
  const {
    labelFor,
    labelTitle,
    selectOptions
  } = props;

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <>
        <LabelStyled for={labelFor}>{labelTitle}</LabelStyled>
  <SelectStyled value={value} name={labelFor} id={labelFor} onChange={handleChange}>
    {options.map(opt => (
      <option value={opt.value}>{opt.description}</option>
    ))}
  </SelectStyled>
    </>
  );
};

export default Select;