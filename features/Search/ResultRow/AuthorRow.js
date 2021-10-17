import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const AuthorRow = props => {
  const {author} = props;

  const authorLocation = author?.location?.value;
  const authorName = author?.name?.value;
  const authorPeriod = author?.period?.value;
  const authorShortBio = '';

  return (
    <div>
      
      <StyledResult dangerouslySetInnerHTML={{ __html: authorName }} />
      <StyledResult dangerouslySetInnerHTML={{ __html: authorLocation }} />
      <StyledResult dangerouslySetInnerHTML={{ __html: authorPeriod }} />


    </div>
  );
};

AuthorRow.propTypes = {
  
};

const StyledResult = styled.div`
  em {
    font-weight: 900;
  }

`
export default AuthorRow;