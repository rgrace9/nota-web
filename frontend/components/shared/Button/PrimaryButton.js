import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const StyledPrimaryButton = styled.button`
  padding: 4px 16px;
  border: 2px solid black;
  background-color: white;
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