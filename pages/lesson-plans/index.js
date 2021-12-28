import React, {useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SearchFiltersContainer } from "@/components/shared/SearchFilters";
import styled from "@emotion/styled";
import StrapiClient from "@/lib/StrapiClient";
import Layout from "@/components/Layout";
import ContentLayout from "@/components/Layout/ContentLayout";
import { ListBox } from "@/components/shared/dataEntry";
import { PrimaryButton, SecondaryButton } from "@/components/shared/Button";
import { formatQuery } from 'utils/queryString';
import { withRouter } from 'next/router'
import qs from 'qs'
import { device } from "@/styles/screenSizes";
import { useListBox } from "@/utils/hooks";
import LessonPlansSearchResults from "@/features/LessonPlansSearchResults";


const STRAPI_CLIENT = new StrapiClient();

const LANGUAGE_QUERY_KEY = 'language.id_eq';

const AUTHOR_QUERY_KEY = 'authors.id_in';


const LessonPlans = (props) => {
  const {
    router,
    authorOptions,
    lessonPlans,
    languageOptions
  } = props;

  const [lessonPlanResults, setLessonPlanResults] = useState([])
  const [loadingResults, setLoadingResults] = useState(false)

  
  const { query } = router;
  const queryString = JSON.stringify(query);
  const queryParams = useMemo(() => qs.parse(query), [queryString]);

  const {
    value: selectedAuthor,
    bind: bindAuthorName,
    reset: resetAuthorName,
  } = useListBox("all");

  const {
    value: selectedLanguage,
    bind: bindTranslationLanguage,
    reset: resetTranslationLanguage,
  } = useListBox("all");

  const onInitialSearch = async (authorValue, languageValue) => {
    const searchParams = {
      ...(authorValue !== 'all' && { [AUTHOR_QUERY_KEY]: authorValue, }),
      ...(languageValue !== 'all' && { [LANGUAGE_QUERY_KEY]: languageValue }),
    }

    if (!authorValue && !languageValue) {
      setLessonPlanResults(lessonPlans)
      setLoadingResults(false)
    } else {
      try {
        const formattedSearchQuery = formatQuery(searchParams);
        setLoadingResults(true)
        const res = await STRAPI_CLIENT.fetchAPI(`lesson-plans?_sort=title:ASC&${formattedSearchQuery}`);
        setLessonPlanResults(res)
        setLoadingResults(false)
      } catch (err) {
        setLessonPlanResults([])
        setLoadingResults(false)
        throw err
      }
    }
  };

  const handleLessonPlansSearch = async (e) => {
    e.preventDefault();
    try {
      setLoadingResults(true)
      const searchParams = {
        ...(selectedAuthor !== 'all' && { [AUTHOR_QUERY_KEY]: selectedAuthor }),
        ...(selectedLanguage !== 'all' && { [LANGUAGE_QUERY_KEY]: selectedLanguage }),
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
        bindAuthorName.onChange(queryParams[AUTHOR_QUERY_KEY] || 'all');
        bindTranslationLanguage.onChange(queryParams[LANGUAGE_QUERY_KEY] || 'all');
        onInitialSearch(queryParams[AUTHOR_QUERY_KEY], queryParams[LANGUAGE_QUERY_KEY]);
      }
    }
    let isMounted = true;

    fetchPageData();
    return () => {
      setLoadingResults(false)
      isMounted = false;
    };
  }, [queryString])

  const handleReset = () => {
    resetAuthorName();
    resetTranslationLanguage();
  }

  return (
    <Layout pageTitle="Lesson Plans">
      <ContentLayout maxWidth='1000px' title="Lesson Plans">
        <SearchFiltersContainer>
          <form onSubmit={handleLessonPlansSearch}>
          <StyledFormRow>
            <StyledSelectContainer>
              <ListBox
                allObject={{ name: "All Authors", id: "all" }}
                labelText="Author"
                labelValue="author"
                options={authorOptions}
                value={selectedAuthor}
                {...bindAuthorName}
              />
            </StyledSelectContainer>
            <StyledSelectContainer>
                  <ListBox
                    dataKey="name"
                    allObject={{ name: "All Languages", id: "all" }}
                    labelText="Language"
                    labelValue="language"
                    options={languageOptions}
                    value={selectedLanguage}
                    {...bindTranslationLanguage}
                  />
                </StyledSelectContainer>
          </StyledFormRow>

            <StyledBtnContainer>
              <PrimaryButton type="submit" text="Search" />
              <SecondaryButton type="reset" text="Clear Fields" onClick={handleReset} />

            </StyledBtnContainer>
          </form>
        </SearchFiltersContainer>
          
           
            <LessonPlansSearchResults loading={loadingResults} results={lessonPlanResults} />
         
      </ContentLayout>
    </Layout>
  );
};

LessonPlans.propTypes = {
  router: PropTypes.object,
  languageOptions: PropTypes.array,
};

export default withRouter(LessonPlans);

export const getStaticProps = async ({ locale }) => {
  const lessonPlans = await STRAPI_CLIENT.fetchAPI("lesson-plans?_sort=title:ASC");

  const authorOptions = await STRAPI_CLIENT.fetchAPI("authors?_sort=name:ASC");

  const languageOptions = await STRAPI_CLIENT.fetchAPI('translation-languages?_sort=name:ASC');

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "nav", "home"])),
      lessonPlans,
      authorOptions,
      languageOptions,
    },
  }
};

const StyledFormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex-direction: column;
  flex-wrap: wrap;
  @media ${device.tablet} {
    flex-direction: row;
  }
`

const StyledSelectContainer = styled.div`
  flex: 0 0 45%;
  margin: 0px;
  width: 100%;
`;

const StyledBtnContainer = styled.div`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
`;