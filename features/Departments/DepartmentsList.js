import React from 'react';
import PropTypes from 'prop-types';

const DepartmentsList = props => {
  const {
    title,
    members,
    description
  } = props;

  return (
    <div>
      <h3>{title}</h3>
    </div>
  );
};

DepartmentsList.propTypes = {
  title: PropTypes.string,
  members: PropTypes.array,
  description: PropTypes.string
};

export default DepartmentsList;