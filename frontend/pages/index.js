import Layout from '../components/Layout';
import Container from '../components/shared/Container';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Home() {
  return (
    <Layout>
        <Container>
        <div>Is this working?</div>
        <div style={{ height: "100vh" }}>Blabla</div>
        <div style={{ height: "100vh" }}>Blabla</div>
        </Container>
    </Layout>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'nav']),
  },
})