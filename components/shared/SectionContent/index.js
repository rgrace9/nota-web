import React from 'react';
import PropTypes from 'prop-types';
import ParsedMarkdown from '@/components/shared/ParsedMarkdown';
import styled from "@emotion/styled";

const StyledSecondaryHeading = styled.h2`
font-size: 4rem;
font-weight: 500;
padding-top: 20px;
`

const SectionContent = props => {
  const {title, body, bodyClassName} = props;

  if (!body) return null;

  return (
    <section>
      {title ? (
        <StyledSecondaryHeading>{title}</StyledSecondaryHeading>
      ) : null}
      <ParsedMarkdown className={bodyClassName} markdownString={body}/>
    </section>
  );
};

SectionContent.propTypes = {
  body: PropTypes.string,
  title: PropTypes.string,
  bodyClassName: PropTypes.string,
};
SectionContent.defaultProps = {
  body: '',
  title: null,
  bodyClassName: 'p-t-20'
};

export default SectionContent;