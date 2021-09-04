import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '@/components/Layout';
import ContentLayout from '@/components/Layout/ContentLayout';

const Translations = () => {
  return (
    <Layout
    pageTitle='Translations'
  >
    <ContentLayout
      title='Translations'
    >
      </ContentLayout>
      </Layout>
  );
};

export default Translations;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
  },
})