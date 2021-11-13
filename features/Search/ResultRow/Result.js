import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ResultIcon from './ResultIcon';

const LessonPlanRow = props => {

  const {description, title, type} = props;

  return (
    <StyledLessonPlanRow>
      <StyledIconContainer>
        <ResultIcon type={type} />
      </StyledIconContainer>
      <p>
        <StyledTitle dangerouslySetInnerHTML={{__html: title}}>
        </StyledTitle>
        
          <StyledShortBio
            dangerouslySetInnerHTML={
              { __html: description }
            }
          />
          
        
      </p>

    </StyledLessonPlanRow>
  );
};

LessonPlanRow.propTypes = {
  
};

const StyledTitle = styled.div`
  text-decoration: underline;
  em {
    font-weight: 900;
  }

`
const StyledShortBio = styled.div`
  color: #343a45;
  em {
    font-weight: 900;
  }

`

const StyledLessonPlanRow = styled.div`
  display: flex;
`

const StyledIconContainer = styled.div`
  flex: 0 0 45px;
`

export default LessonPlanRow;