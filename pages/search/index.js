import React, { useEffect, useMemo, useState }  from 'react';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { withRouter } from 'next/router'
import qs from 'qs'
import SearchPage from '@/features/SearchPage';

import Layout from '@/components/Layout';
import ContentLayout from '@/components/Layout/ContentLayout';
const Search = props => {

  const {
    router
  } = props;

  const { asPath, query } = router;

  const queryString = JSON.stringify(query);
  const queryParams = useMemo(() => qs.parse(query), [queryString]);

  console.log({
    query,
    queryParams,
    queryString
  })

  return (
    <Layout
      pageTitle='Project Nota | Search'
    >
      <ContentLayout
        title='Search'
      >
        <SearchPage searchValue={queryParams.query} />
      </ContentLayout>
    </Layout>
  );
};

Search.propTypes = {
  
};

export default withRouter(Search);

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
  },
})