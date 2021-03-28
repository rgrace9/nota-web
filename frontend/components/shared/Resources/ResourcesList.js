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
  resources: [1, 2, 3]
};

export default ResourcesList;


const ResourcesListContainer = styled.ul`
  display: flex;
  /* justify-content: space-between;
  flex-wrap: wrap; */
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  /* margin: 0; */
  margin: 0 -1rem;
  padding: 0;

`

const ResourceItem = styled.li`
  display: flex;
  padding: 1rem;
  @media(min-width: 40rem) {
    width: 50%;
  }
  @media(min-width: 56rem) {
    width: 33.3333%;
  }

`