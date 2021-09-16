import React from 'react';
import PropTypes from 'prop-types';
import ResourceTile from './ResourceTile';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react'


const ResourcesList = props => {
  const {resources} = props;
  return (
    <ResourcesListContainer>
      {resources.map(r => (
        <ResourceItem key={r}>
          
          <ResourceTile key={r} data={r}/>
        </ResourceItem>
      ))}
      
    </ResourcesListContainer>
  );
};

ResourcesList.propTypes = {
  resources: PropTypes.array
};
ResourcesList.defaultProps = {
  resources: []
};

export default ResourcesList;


const ResourcesListContainer = styled.ul`
  display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    grid-column-gap: 1.5rem;
    grid-row-gap: 1.5rem;

`

const ResourceItem = styled.li`
    /* border: 1px solid; */
    border-radius: 0.25rem;
    display: flex;
    flex-direction: column;
    position: relative;
`