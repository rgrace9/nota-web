import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {burgundy, white} from '@/styles/colors';

const StyledPrimaryButton = styled.button`
  padding: 10px 60px;
  border: 2px solid black;
  background-color: white;
  border-radius: 15px;
  min-height: 30px;
  font-size: 2.5rem;
  background-color: ${burgundy};
  color: ${white};
  font-weight: bold;
  &:hover {
    text-decoration: underline;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);

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