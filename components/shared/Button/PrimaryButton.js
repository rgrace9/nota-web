import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {burgundy, white} from '@/styles/colors';

const StyledPrimaryButton = styled.button`
  padding: 4px 30px;
  border: 2px solid black;
  background-color: white;
  border-radius: 15px;
  min-height: 30px;
  font-size: 1.6rem;
  &:hover {
    background-color: ${burgundy};
    color: ${white};
    border: 2px solid ${white};
  }
`
const PrimaryButton = props => {
  const {type, text, onClick} = props;
  return (
    <StyledPrimaryButton type={type} onClick={onClick}>
      {text}
    </StyledPrimaryButton>
  );
};

PrimaryButton.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  text: PropTypes.string
};
PrimaryButton.defaultProps = {
  onClick: () => {},
  type: 'button',
  text: ''
};


export default PrimaryButton;