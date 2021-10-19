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

const LessonPlans = (props) => {
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
    <Layout pageTitle="Lesson Plans">
      <ContentLayout title="Lesson Plans">
        <SearchFiltersContainer>
          <form onSubmit={handleLessonPlansSearch}>
          <StyledFormRow>
            <ListBox
              allObject={{ name: "All Authors", id: "all" }}
              labelText="Author"
              labelValue="author"
              options={AUTHOR_OPTIONS}
            />
            <ListBox
              allObject={{ name: "All Prices", id: "all" }}
              labelText="Price"
              labelValue="price"
              options={PRICES}
            />
          </StyledFormRow>

            <div>
              <PrimaryButton type="submit" text="Search" />
            </div>
          </form>
        </SearchFiltersContainer>
          
           
            <LessonPlansSearchResults results={lessonPlans} />
         
      </ContentLayout>
    </Layout>
  );
};

LessonPlans.propTypes = {};

export default withRouter(LessonPlans);

export const getStaticProps = async ({ locale }) => {
  const lessonPlans = await STRAPI_CLIENT.fetchAPI("lesson-plans");
  const authorOptions = await STRAPI_CLIENT.fetchAPI("authors");

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "nav", "home"])),
      lessonPlans,
      authorOptions,
    },
  }
};

const StyledFormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`