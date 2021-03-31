import Layout from '../components/Layout';
import Container from '../components/shared/Container';
import { useTranslation } from 'next-i18next'
import {Search, FeaturedResources} from '../features';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Home() {
  const { t } = useTranslation('home')

  return (
    <Layout
      pageTitle='Project Nota | About'
    >
     
        <div>Is this working?</div>
        <div style={{ height: "100vh" }}>Blabla</div>
        <div style={{ height: "100vh" }}>Blabla</div>

      
    </Layout>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
  },
})