import React from 'react';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '@/components/Layout';
import ContentLayout from '@/components/Layout/ContentLayout';
const LessonPlans = props => {
  return (
    <Layout
      pageTitle='Project Nota | Search'
    >
      <ContentLayout
        title='Search'
      >
        <p>Lorem Ipsum</p>
      </ContentLayout>
    </Layout>
  );
};

LessonPlans.propTypes = {
  
};

export default LessonPlans;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
  },
})