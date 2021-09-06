import styled from "@emotion/styled";

const StyledUnorderedList = styled.ul`
 
li {
  list-style-type: ${(props = true) =>
    props.bulletPoints ? 'initial' :  'none'};
  &:before {
    content: ${(props) =>
    props.bulletPoints ? 'initial' :  '\\200B'};
  };
  margin-left: ${(props) =>
    props.indent ? props.indent :  '0'};
}

`


export default StyledUnorderedList;