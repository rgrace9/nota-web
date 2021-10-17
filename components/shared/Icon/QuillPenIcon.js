import React from 'react';
import PropTypes from 'prop-types';

const QuillPenIcon = props => {
  const {width, height} = props;

  return (
    <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36.38 36.38" xmlnsXlink="https://vecta.io/nano"><path d="M21.709 10.597l2.781-1.662-.078-.819C23.798 2.683 21.511 0 21.511 0c-5.262 3.497-7.617 10.224-7.617 10.224l.77 2.582-1.426-.646c-2.465 7.079.162 14.88.162 14.88.207.309.432.525.662.68 3.045-13.508 4.994-18.381 4.994-18.381-.688 1.754-2.508 11.943-3.664 18.666.572-.082 1-.363 1-.363 8.557-9.391 7.799-17.211 7.799-17.211-.598-.344-2.482.166-2.482.166z"/><path d="M14.062 27.72l-2.172 8.66 1.162-1.346 2.34-7.029c-.402.059-.875.016-1.33-.285z"/></svg>
  );
};

QuillPenIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

QuillPenIcon.defaultProps = {
  width: '30px',
  height: '30px'
};

export default QuillPenIcon;