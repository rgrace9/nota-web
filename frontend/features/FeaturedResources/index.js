import styled from '@emotion/styled';
import React from 'react';
import {ResourcesList} from 'components/shared/Resources';

const HeadingStyle = styled.h2`
  color: var(--text-dark);
  font-size: 32px;
`
const FeaturedContainer = styled.div`
  display: flex;
  flex-direction: column;
`


const FeaturedResources = () => {
  return (
      <FeaturedContainer>
        <HeadingStyle>Featured Resources</HeadingStyle>
        <ResourcesList />
      </FeaturedContainer>
  );
};

export default FeaturedResources;