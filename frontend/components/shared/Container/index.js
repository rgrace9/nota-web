import React from 'react';
import PropTypes from 'prop-types';
import ContainerStyled from './style';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react'

const Container = props => {

  const {children, bgColor, ..._props} = props;

  return (
    <ContainerWrapper bgColor={bgColor}>
      <ContainerStyled >{children}</ContainerStyled>
    </ContainerWrapper>
  );
};

Container.propTypes = {
  
};

export default Container;

const ContainerWrapper = styled.div`
display: flex;
padding: 20px 0px;
  ${(props) => props.bgColor ? css`
      background-color: ${props.bgColor};
    ` : undefined}
`