import styled from "@emotion/styled";

const StyledNumberedList = styled.ol`
 
li {
  margin-left: ${(props = '20px') =>
    props.indent ? props.indent :  '0'};
}

`


export default StyledNumberedList;