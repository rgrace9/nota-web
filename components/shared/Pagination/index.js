import React from 'react';
import PropTypes from 'prop-types';

const Pagination = props => {
  return (
    <div>
      
    </div>
  );
};

Pagination.propTypes = {
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  onPageChange: PropTypes.func,
  siblingCount: PropTypes.number,
  className: PropTypes.string
};

Pagination.defaultProps = {
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
  siblingCount: 1,
};

export default Pagination;