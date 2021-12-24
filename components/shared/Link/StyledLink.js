import styled from '@emotion/styled';
import * as colors from 'styles/colors';


const StyledLink = styled.a`
  color: ${colors.navyBlue};
  text-decoration: underline;
  font-size: ${(props) => props.fontSize || '2.5rem'};
  cursor: pointer;
  &:hover {
    color: ${colors.lightCream};
    background: ${colors.navyBlue};
  }
`

export default StyledLink;