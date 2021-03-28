import styled from '@emotion/styled';

const Container  =  styled.div`
  display: flex;
  width: 100%;
  margin: 30px ;
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

  }
  
  `
  // const ContainerComponent 

  export default Container;