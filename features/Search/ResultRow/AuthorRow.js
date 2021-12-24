import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import QuillPenIcon from '@/components/shared/Icon/QuillPenIcon';
import ParsedMarkdown from '@/components/shared/ParsedMarkdown';

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
        <StyledTitle>
          {`${authorName}: ${authorLocation ? authorLocation : ''}${(authorLocation && authorPeriod) ? ';' : '' } ${authorPeriod ? authorPeriod : ''}` }
        </StyledTitle>
        <div className='p-l-20'>
          <ParsedMarkdown dangerouslySetInnerHTML={{ __html: authorShortBio}}/>
        </div>
      </div>

    </StyledAuthorRow>
  );
};

AuthorRow.propTypes = {
  
};

const StyledTitle = styled.span`
  em {
    font-weight: 900;
  }

`
const StyledShortBio = styled.span`
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