import styled from '@emotion/styled';
import React from 'react';
import Container from '../../components/shared/Container';

const HeadingStyle = styled.h1`
  color: #1a0404;
`


const FeaturedResources = () => {
  return (
    <Container>
      <HeadingStyle>Featured Resources</HeadingStyle>
    </Container>
  );
};

export default FeaturedResources;