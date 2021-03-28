import styled from '@emotion/styled';
import React from 'react';
import Container from '../../components/shared/Container';

const HeadingStyle = styled.h2`
  color: var(--text-dark);
  font-size: 32px;
`


const FeaturedResources = () => {
  return (
    <Container>
      <HeadingStyle>Featured Resources</HeadingStyle>
    </Container>
  );
};

export default FeaturedResources;