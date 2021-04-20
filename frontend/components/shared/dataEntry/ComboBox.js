import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import React from 'react';
import PropTypes from 'prop-types';

const ComboboxSelect = props => {
  const {options} = props;
  return (
    <div>
      <Combobox aria-label="choose a fruit">
        <ComboboxInput autoComplete />
        <ComboboxPopover>
          <ComboboxList>
            {options.map(opt => (
              <ComboboxOption key={opt.id} value={opt.id}>
                {opt.name} <ComboboxOptionText/>
              </ComboboxOption>
            ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

ComboboxSelect.propTypes = {
  options: PropTypes.array
};
ComboboxSelect.defaultProps = {
  options: []
};

export default ComboboxSelect;