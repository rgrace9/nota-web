import Layout from '../components/Layout';
import Container from '../components/shared/Container';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {Search, FeaturedResources} from '../features';
import Head from 'next/head';

export default function Home() {

  const { t } = useTranslation('home')

  return (
    <Layout>
            <Head>
        <title>Project Nota</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <Container>
        <Search />
        </Container>
        <FeaturedResources />
    </Layout>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
  },
})