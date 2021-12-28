import { Input } from "reakit/Input";
import { Global, css } from '@emotion/react'
import styled from '@emotion/styled';

const StyledInput = styled.input`
  display: block;
  width: 100%;
  border-radius: 0.2rem;
  padding: 0.5em 0.75em;
  font-size: 100%;
  border: 1px solid rgba(0, 0, 0, 0.25);
  color: #4d4d4d;
  margin: 0 !important;
  box-sizing: border-box;

  padding: 1px 10px 2px;
    border: 1px solid;
    border-color: rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186);
    font-size: 2.5rem;
    height: 30px;
  &:focus {
    border-color: rgba(0, 0, 0, 0.25);
  }
`;

function InputField() {
  return <StyledInput value="value" placeholder="input" />;
}

export default InputField;