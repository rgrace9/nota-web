import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {burgundy, white} from '@/styles/colors';

const StyledSecondaryButton = styled.button`
  padding: 10px 60px;
  border-radius: 15px;
  min-height: 30px;
  font-size: 1.8rem;
  background-color: transparent;
  color: black;
  border: ${burgundy} 4px solid;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`
const SecondaryButton = props => {
  const {type, text, onClick} = props;
  return (
    <StyledSecondaryButton type={type} onClick={onClick}>
      {text}
    </StyledSecondaryButton>
  );
};

SecondaryButton.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  text: PropTypes.string
};
SecondaryButton.defaultProps = {
  onClick: () => {},
  type: 'button',
  text: ''
};


export default SecondaryButton;