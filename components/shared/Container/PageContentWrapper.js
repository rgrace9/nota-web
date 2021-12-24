import styled from "@emotion/styled";
import React from 'react';
import PropTypes from 'prop-types';

const StyledMainContentWrapper = styled.div`
  width: 100%;
  padding-right: 20px;
`
const StyledPrimaryHeading = styled.h1`
  font-size: 5rem;
  font-weight: 500;
`

const PageWrapper = styled.div`
    display: flex;    
    flex-direction: column;
    justify-content: space-between;
    transition: ease all .5s;
    width: 100%;
`

const PageContentWrapper = props => {

  const {title, children} = props;

  return (
    <PageWrapper>
      <StyledMainContentWrapper>
       {title ? (
         <StyledPrimaryHeading>{title}</StyledPrimaryHeading>
       ) : null } 
        {children}
      </StyledMainContentWrapper>
    </PageWrapper>

  );
};

PageContentWrapper.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};

export default PageContentWrapper;