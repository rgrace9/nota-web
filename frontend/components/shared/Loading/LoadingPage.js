import React from 'react';
import styled from '@emotion/styled';
import * as colors from 'styles/colors';
import {amiri} from 'styles/fonts';

const LoadingPage = (props) => {
  const {loadingText} = props;
  return (
    <StyledLoadingContainer>
      <StyledLoader></StyledLoader>
      <StyledText>{loadingText}</StyledText>
    </StyledLoadingContainer>
  );
};

export default LoadingPage;

const StyledLoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 24px;

`

const StyledLoader = styled.div`
  @-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

  border: 16px solid ${colors.cream};
  border-radius: 50%;
  border-top: 16px solid ${colors.navyBlue};
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
`

const StyledText = styled.p`
  margin-top: 24px;
  font-family: ${amiri};
  color: ${colors.darkBrown};
  font-size: 1.8rem;
  font-weight: 400;

`