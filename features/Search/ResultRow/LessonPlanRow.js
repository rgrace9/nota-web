import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import QuillPenIcon from '@/components/shared/Icon/QuillPenIcon';

const LessonPlanRow = props => {
  const {lessonPlan} = props;

  const {description, title} = props;

  return (
    <StyledLessonPlanRow>
      <StyledIconContainer>
        <QuillPenIcon />
      </StyledIconContainer>
      <div>
        <StyledTitle>
          {title}
        </StyledTitle>
        <div className='p-l-20'>
          <StyledShortBio>
            {description}
          </StyledShortBio>
        </div>
      </div>

    </StyledLessonPlanRow>
  );
};

LessonPlanRow.propTypes = {
  
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

const StyledLessonPlanRow = styled.div`
  display: flex;
  align-items: center;
`

const StyledIconContainer = styled.div`
  flex: 0 0 45px;
`

export default LessonPlanRow;