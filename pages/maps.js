import styled from '@emotion/styled';
import Layout from '../components/Layout';
import Container from '../components/shared/Container';


export default function Home() {


  const Paragraph = styled.p`
    color: var(--text);

  `

  return (
    <Layout>
     
        <Paragraph>Maps</Paragraph>
      
    </Layout>
  );
};