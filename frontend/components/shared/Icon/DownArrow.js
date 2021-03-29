import React from 'react';
import PropTypes from 'prop-types';

const DownArrow = props => {
  const {width, height} = props;
  return (
    <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><path d="M11.767 15.252l6.905-6.855a1.12 1.12 0 1 0-1.579-1.59l-6.11 6.065-6.065-6.11a1.12 1.12 0 1 0-1.59 1.579l6.854 6.905c.218.22.504.33.791.331s.574-.107.793-.325" fill="currentColor"/><defs /></svg>

    );
};

DownArrow.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
};

DownArrow.defaultProps = {
  width: '24px',
  height: '24px'
}
export default DownArrow;