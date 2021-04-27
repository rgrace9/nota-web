import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '@/components/Layout';
import ContentLayout from '@/components/Layout/ContentLayout';

const Digitizations = () => {
  return (
    <Layout
    pageTitle='Digitizations'
  >
    <ContentLayout
      title='Digitizations'
    >
      </ContentLayout>
      </Layout>
  );
};

export default Digitizations;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
  },
})