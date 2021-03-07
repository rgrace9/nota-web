import React from 'react';
import PropTypes from 'prop-types';
import ContainerStyled from './style';

const Container = props => {

  const {children, ..._props} = props;
  return (
    <div style={{display: 'flex'}}>
      <ContainerStyled {..._props}>{children}</ContainerStyled>
    </div>
  );
};

Container.propTypes = {
  
};

export default Container;