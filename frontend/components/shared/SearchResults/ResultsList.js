import React from 'react';
import PropTypes from 'prop-types';

const ResultsList = props => {
  const {results} = props;
  return (
    <ul>
      {results.map((result) => (
        <li>
          {result.name}
        </li>
      ))}
    </ul>
  );
};

ResultsList.propTypes = {
  
};

export default ResultsList;