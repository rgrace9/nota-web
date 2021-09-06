import React from 'react';
import PropTypes from 'prop-types';
import styled from "@emotion/styled";
import {StyledNumberedList} from 'components/shared/List';

const ContentLayout = props => {
  const {title, children} = props;
  return (
    <StyledContainer>
      <StyledHeading>{title}</StyledHeading>
      <StyledContent css={StyledNumberedList}>
        {children}
      </StyledContent>
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

const StyledContent = styled.div`
  p, ul, ol {
    font-size: 1.6rem;
  }
  ul, ol {
    margin-left: 40px;
  }
  h2, h3, h4 {
    font-size: 2.4rem;
    display: inline-block;
    margin-bottom: 15px;

  };
 
`