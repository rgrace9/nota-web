import React from 'react';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '@/components/Layout';
import ContentLayout from '@/components/Layout/ContentLayout';
const Authors = props => {
  return (
    <Layout
      pageTitle='Authors'
    >
      <ContentLayout
        title='Authors'
      >
        <p>Lorem Ipsum</p>
      </ContentLayout>
    </Layout>
  );
};

Authors.propTypes = {
  
};

export default Authors;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
  },
})