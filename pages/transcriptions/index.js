import React, {useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SearchFiltersContainer } from "@/components/shared/SearchFilters";
import styled from "@emotion/styled";
import StrapiClient from "@/lib/StrapiClient";
import Layout from "@/components/Layout";
import ContentLayout from "@/components/Layout/ContentLayout";
import { ListBox } from "@/components/shared/dataEntry";
import { AUTHOR_OPTIONS, PRICES } from "@/constants/index";
import { PrimaryButton } from "@/components/shared/Button";
import { formatQuery } from 'utils/queryString';
import { withRouter } from 'next/router'
import qs from 'qs'
import { device } from "@/styles/screenSizes";
import { useListBox } from "@/utils/hooks";
import LessonPlansSearchResults from "@/features/LessonPlansSearchResults";


const STRAPI_CLIENT = new StrapiClient();

const Transcriptions = (props) => {
  const {
    router,
    authorOptions,
    lessonPlans
  } = props;

  const { asPath, query } = router;
  const queryString = JSON.stringify(query);
  const queryParams = useMemo(() => qs.parse(query), [queryString]);

  const handleLessonPlansSearch = () => {
    // e.preventDefault();
  };  
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