import React, {useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SearchFiltersContainer } from "@/components/shared/SearchFilters";
import styled from "@emotion/styled";
import StrapiClient from "@/lib/StrapiClient";
import Layout from "@/components/Layout";
import ContentLayout from "@/components/Layout/ContentLayout";
import { ListBox } from "@/components/shared/dataEntry";
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

  const [lessonPlanResults, setLessonPlanResults] = useState([])
  const [loadingResults, setLoadingResults] = useState(false)

  
  const { asPath, query } = router;
  const queryString = JSON.stringify(query);
  const queryParams = useMemo(() => qs.parse(query), [queryString]);

  const {
    value: selectedAuthor,
    bind: bindAuthorName,
    reset: resetAuthorName,
  } = useListBox("all");

  const onInitialSearch = async (authorValue) => {
    try {
      const searchParams = {
        ...(authorValue !== 'all' && { 'authors.id_in': authorValue, }),
      }
      const formattedSearchQuery = formatQuery(searchParams);
      setLoadingResults(true)
      const res = await STRAPI_CLIENT.fetchAPI(`lesson-plans?${formattedSearchQuery}`);
      setLessonPlanResults(res)
      setLoadingResults(false)
    } catch (err) {
      setLessonPlanResults([])
      setLoadingResults(false)
      throw err
    }
  };

  const handleLessonPlansSearch = async (e) => {
    e.preventDefault();
    try {
      setLoadingResults(true)
      const searchParams = {
        ...(selectedAuthor !== 'all' && { 'authors.id_in': selectedAuthor }),

      }
      const formattedSearchQuery = formatQuery(searchParams);
      const newURL = `/lesson-plans?${formattedSearchQuery}`;
      const res = await STRAPI_CLIENT.fetchAPI(`lesson-plans?${formattedSearchQuery}`);
      setLessonPlanResults(res)
      setLoadingResults(false)
      router.replace(newURL, undefined, { shallow: true })

    } catch(err) {
      setLessonPlanResults([])
      setLoadingResults(false)
    }
  };

  useEffect(() => {

    const fetchPageData = async () => {
      if (isMounted) {
        setLoadingResults(true)
        bindAuthorName.onChange(queryParams['authors.id_in'] || 'all');
        if (queryParams['authors.id_in']) {
          onInitialSearch(queryParams['authors.id_in']);
        } else {
          setLessonPlanResults(lessonPlans)
        }
      }
    }
    let isMounted = true;

    fetchPageData();
    return () => {
      setLoadingResults(false)
      isMounted = false;
    };
  }, [queryString])


  return (
    <Layout pageTitle="Lesson Plans">
      <ContentLayout maxWidth='1000px' title="Lesson Plans">
        <SearchFiltersContainer>
          <form onSubmit={handleLessonPlansSearch}>
          <StyledFormRow>
            <StyledOptionContainer>
              <ListBox
                allObject={{ name: "All Authors", id: "all" }}
                labelText="Author"
                labelValue="author"
                options={authorOptions}
                value={selectedAuthor}
                {...bindAuthorName}
              />
            </StyledOptionContainer>
          </StyledFormRow>

            <div>
              <PrimaryButton type="submit" text="Search" />
            </div>
          </form>
        </SearchFiltersContainer>
          
           
            <LessonPlansSearchResults loading={loadingResults} results={lessonPlanResults} />
         
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

const StyledOptionContainer = styled.div`
  width: 45%;
`