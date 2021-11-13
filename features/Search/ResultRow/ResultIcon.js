import QuillPenIcon from '@/components/shared/Icon/QuillPenIcon';
import ChalkboardUserIcon from '@/components/shared/Icon/ChalkboardUserIcon';
import React from 'react';
import GlobeIcon from '@/components/shared/Icon/GlobeIcon';
import PropTypes from 'prop-types';

const ResultIcon = props => {
  const {type} = props;
  
  return (
    <div>
    {(function() {
      switch(type) {
       case 'lessonPlans':
        return (
          <ChalkboardUserIcon />
        );
       case 'authors':
        return (
          <QuillPenIcon />
        );
       case 'translations':
        return (
          <GlobeIcon />
        );
       default:
        return (
          <ChalkboardUserIcon />
        );
       }
      }
    )()}
  </div>
  );
};

ResultIcon.propTypes = {
  
};

export default ResultIcon;