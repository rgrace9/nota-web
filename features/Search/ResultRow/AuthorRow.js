import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import QuillPenIcon from '@/components/shared/Icon/QuillPenIcon';

const AuthorRow = props => {
  const {author} = props;

  const authorLocation = author?.location?.value;
  const authorName = author?.name?.value;
  const authorPeriod = author?.period?.value;
  const authorShortBio = author?.shortBiography?.value || ''; 

  return (
    <StyledAuthorRow>
      <StyledIconContainer>
        <QuillPenIcon />
      </StyledIconContainer>
      <div>
        <StyledResult
          dangerouslySetInnerHTML={
            { __html: `${authorName}: ${authorLocation ? authorLocation : ''}${(authorLocation && authorPeriod) ? ';' : '' } ${authorPeriod ? authorPeriod : ''}` }
          }
        />
        <div>
          <StyledShortBio dangerouslySetInnerHTML={{ __html: authorShortBio}}/>
        </div>
      </div>

    </StyledAuthorRow>
  );
};

AuthorRow.propTypes = {
  
};

const StyledResult = styled.span`
  em {
    font-weight: 900;
  }

`
const StyledShortBio = styled.span`
  /* color: #43516b; */
  color: #343a45;
  em {
    font-weight: 900;
  }

`

const StyledAuthorRow = styled.div`
  display: flex;
  align-items: center;
`

const StyledIconContainer = styled.div`
  flex: 0 0 45px;
`

export default AuthorRow;