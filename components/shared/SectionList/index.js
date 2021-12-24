import React from 'react';
import PropTypes from 'prop-types';
import styled from "@emotion/styled";
import  {StyledUnorderedList} from '@/components/shared/List';

const StyledSecondaryHeading = styled.h2`
font-size: 4rem;
font-weight: 500;
padding-top: 20px;
`

const SectionList = props => {
  const {title, listLength, children, bodyClassName} = props;

  if (!listLength) return null;

  return (
    <section>
      {title ? (
        <StyledSecondaryHeading>{title}</StyledSecondaryHeading>
      ) : null}
      <StyledUnorderedList className='m-t-20'>
        {children}
      </StyledUnorderedList>
    </section>
  );
};

SectionList.propTypes = {
  body: PropTypes.string,
  title: PropTypes.string,
  bodyClassName: PropTypes.string,
};
SectionList.defaultProps = {
  body: '',
  title: null,
  bodyClassName: 'p-t-20'
};

export default SectionList;