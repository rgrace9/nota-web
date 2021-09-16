import styled from '@emotion/styled';
import React from 'react';
import {ResourcesList} from 'components/shared/Resources';
import PropTypes from "prop-types";


const HeadingStyle = styled.h2`
  color: var(--text-dark);
  font-size: 3.2rem;
`
const FeaturedContainer = styled.div`
  display: flex;
  flex-direction: column;
`


const FeaturedResources = ({ resources }) => {
  return (
      <FeaturedContainer>
        <HeadingStyle>Featured Resources</HeadingStyle>
        <ResourcesList resources={resources} />
      </FeaturedContainer>
  );
};

PropTypes.defaultProps = {
  resources: []
}
PropTypes.propTypes = {
  resources: PropTypes.array
}

export default FeaturedResources;