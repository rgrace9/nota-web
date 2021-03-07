import styled from '@emotion/styled';

const Container  =  styled.div`
  display: flex;

  margin: 30px auto;
  @media (min-width: 768px) {
    /* screen width is less than 768px (medium) */
    margin: 100px  auto;
  }
  @media (min-width: 1024px) {
    /* margin: 0  auto; */
    margin: auto;
  }
  @media (min-width: 1200px) {
    /* margin: 0  auto; */
    margin: auto;

  }
  
  `
  // const ContainerComponent 

  export default Container;