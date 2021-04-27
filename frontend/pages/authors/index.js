import React from 'react';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {SearchFiltersContainer} from '@/components/shared/SearchFilters';

import Layout from '@/components/Layout';
import ContentLayout from '@/components/Layout/ContentLayout';
import {ListBox} from '@/components/shared/dataEntry';
import {AUTHOR_OPTIONS, AUTHOR_LOCATIONS} from '@/constants/index';
import {PrimaryButton} from '@/components/shared/Button';

const Authors = props => {
  return (
    <Layout
      pageTitle='Authors'
    >
      <ContentLayout
        title='Authors'
      >
                <SearchFiltersContainer>
          <form>
            <ListBox labelText='Author' labelValue='author' options={AUTHOR_OPTIONS}/>
            <ListBox labelText='Location' labelValue='author-location' options={AUTHOR_LOCATIONS}/>
            <div><PrimaryButton type='submit' text='Search'/></div>

          </form>
        </SearchFiltersContainer>
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