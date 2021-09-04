import Layout from '../components/Layout';
import Container from '../components/shared/Container';
import { useTranslation } from 'next-i18next'
import {Search, FeaturedResources} from '../features';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ContentLayout from '@/components/Layout/ContentLayout';

export default function Home() {
  const { t } = useTranslation('home')

  return (
    <Layout
      pageTitle='Project Nota | Donate'
    >
           <ContentLayout
        title='Donate'
      >

      </ContentLayout>
       

      
    </Layout>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
  },
})