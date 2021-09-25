import React from 'react';
import PropTypes from 'prop-types';
import styled from "@emotion/styled";

const ContentLayout = props => {
  const {title, children} = props;
  return (
    <StyledContainer>
      <StyledHeading>{title}</StyledHeading>
      {children}
    </StyledContainer>
  );
};

ContentLayout.propTypes = {
  title: PropTypes.string.isRequired
};

export default ContentLayout;

const StyledContainer = styled.div`
  margin-top: 20px;
  padding: 0px 60px;
`
// const StyledHeading = styled.h1`
//   font-size: 3.6rem;
//   color: var(--text-dark)
// `
const StyledHeading = styled.h1`
  font-size: 3.6rem;
  color: var(--text-dark);
  display: inline-block;
  margin-bottom: 20px;
  &::after {
    height: 5px;
    display: block;
    /* width: 100%; */
    background: var(--headerBg);
    border-right: 1px white;
    content: '';
}

`