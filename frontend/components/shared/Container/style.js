import styled from '@emotion/styled';
import { Global, css } from '@emotion/react'

const Container  =  styled.div`
  display: flex;
  width: 100%;
  margin: 30px ;
  max-width: 1500px;
  ${(props) => props.justifyContent ? css`
      justify-content: ${props.justifyContent};
    ` : 'initial'}
   /* margin: auto; */
  @media (min-width: 768px) {
    /* screen width is less than 768px (medium) */
    /* margin: 100px  ; */
  }
  @media (min-width: 1024px) {
    /* margin: 0  auto; */
   
  }
  @media (min-width: 1200px) {
    /* margin: 0  auto; */
    margin: 100px;

  }`
  // const ContainerComponent 

  export default Container;