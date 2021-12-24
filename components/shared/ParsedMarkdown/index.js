import React from 'react';
import PropTypes from 'prop-types';
import showdown from 'showdown';
import styled from "@emotion/styled";
import * as colors from 'styles/colors';

const ParsedMarkdown = props => {
  const { markdownString, className } = props;
  const converter = new showdown.Converter({'simplifiedAutoLink': true});


  const StyledText = styled.div`
    white-space: pre-wrap;
    font-size: 2.5rem;
    a {
      color: ${colors.navyBlue};
      text-decoration: underline;
      cursor: pointer;
      position: relative;
      &:hover {
        color: ${colors.lightCream};
        background: ${colors.navyBlue};
      }
    }
    ul, ol {
      margin-left: 30px;
    }
  `
  return (
    <StyledText className={className}
      dangerouslySetInnerHTML={{__html: converter.makeHtml(markdownString)}}
    />
  );
};

ParsedMarkdown.propTypes = {
  markdownString: PropTypes.string,
  className: PropTypes.string
};

ParsedMarkdown.defaultProps = {
  markdownString: '',
  className: null
};

export default ParsedMarkdown;