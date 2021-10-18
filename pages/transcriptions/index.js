import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '@/components/Layout';
import ContentLayout from '@/components/Layout/ContentLayout';

const Transcriptions = () => {
  return (
    <Layout
    pageTitle='Transcriptions'
  >
    <ContentLayout
      title='Transcriptions'
    >
      </ContentLayout>
      </Layout>
  );
};

export default Transcriptions;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
  },
})