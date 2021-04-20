import React from 'react';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {SearchFiltersContainer} from '@/components/shared/SearchFilters';

import Layout from '@/components/Layout';
import ContentLayout from '@/components/Layout/ContentLayout';
import {ComboBox} from '@/components/shared/dataEntry';

const AUTHOR_OPTIONS = [
  {
  "id": 31,
  "name": "Catarina Imperiale",
  "biography": null,
  "published_at": "2021-04-17T15:35:54.227Z",
  "created_at": "2021-04-17T15:35:54.231Z",
  "updated_at": "2021-04-17T15:35:54.231Z",
  "categories": [],
  "transcriptions": [],
  "lesson_plans": []
  },
  {
  "id": 32,
  "name": "Lercari Pallavicini",
  "biography": null,
  "published_at": "2021-04-17T15:35:54.227Z",
  "created_at": "2021-04-17T15:35:54.249Z",
  "updated_at": "2021-04-17T15:35:54.249Z",
  "categories": [],
  "transcriptions": [],
  "lesson_plans": []
  },
  {
  "id": 33,
  "name": "Johanna Otho",
  "biography": null,
  "published_at": "2021-04-17T15:35:54.227Z",
  "created_at": "2021-04-17T15:35:54.265Z",
  "updated_at": "2021-04-17T15:35:54.265Z",
  "categories": [],
  "transcriptions": [],
  "lesson_plans": []
  },
  {
  "id": 34,
  "name": "Maria Hutchenson",
  "biography": null,
  "published_at": "2021-04-17T15:35:54.227Z",
  "created_at": "2021-04-17T15:35:54.281Z",
  "updated_at": "2021-04-17T15:35:54.281Z",
  "categories": [],
  "transcriptions": [],
  "lesson_plans": []
  },
  {
  "id": 35,
  "name": "Anna Memorata",
  "biography": null,
  "published_at": "2021-04-17T15:35:54.227Z",
  "created_at": "2021-04-17T15:35:54.297Z",
  "updated_at": "2021-04-17T15:35:54.297Z",
  "categories": [],
  "transcriptions": [],
  "lesson_plans": []
  },
  {
  "id": 36,
  "name": "Camille de Morel",
  "biography": null,
  "published_at": "2021-04-17T15:35:54.230Z",
  "created_at": "2021-04-17T15:35:54.315Z",
  "updated_at": "2021-04-17T15:35:54.315Z",
  "categories": [],
  "transcriptions": [],
  "lesson_plans": []
  }
  ]
const LessonPlans = props => {
  return (
    <Layout
      pageTitle='Lesson Plans'
    >
      <ContentLayout
        title='Lesson Plans'
      >
        <SearchFiltersContainer>
          <form>
            <ComboBox options={AUTHOR_OPTIONS}/>
          </form>
        </SearchFiltersContainer>
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