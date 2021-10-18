import React from 'react';
import PropTypes from 'prop-types';
import styled from "@emotion/styled";
import { Global, css } from '@emotion/react'
import {device} from '@/styles/screenSizes';

const ContentLayout = props => {
  const {title, children, maxWidth, backgroundColor} = props;
  return (
    <StyledContainer backgroundColor={backgroundColor}>
      <StyledInnerContainer maxWidth={maxWidth}>
        <StyledHeading>{title}</StyledHeading>
        {children}
      </StyledInnerContainer>
    </StyledContainer>
  );
};

ContentLayout.propTypes = {
  title: PropTypes.string.isRequired,
  maxWidth: PropTypes.string,
};
ContentLayout.defaultProps = {
  maxWidth: '1500px',
};

export default ContentLayout;

const StyledContainer = styled.div`
  ${(props) => css`
    background: ${props.backgroundColor};
  `};
`
const StyledInnerContainer = styled.div`
  margin: 20px auto;
  padding: 30px 50px;
  @media ${device.laptop} {
    padding: 30px 20px;
  }
  ${(props) => css`
    max-width: ${props.maxWidth};
  `};
`

const StyledHeading = styled.h1`
  font-size: 3.6rem;
  color: var(--text-dark);
  display: inline-block;
  margin-bottom: 20px;
  &::after {
    height: 5px;
    display: block;
    background: var(--headerBg);
    border-right: 1px white;
    content: '';
}

`