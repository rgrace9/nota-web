import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SearchFiltersContainer } from "@/components/shared/SearchFilters";
import styled from "@emotion/styled";
import Layout from "@/components/Layout";
import ContentLayout from "@/components/Layout/ContentLayout";
import { ListBox } from "@/components/shared/dataEntry";
import { PrimaryButton, SecondaryButton } from "@/components/shared/Button";
import StrapiClient from "@/lib/StrapiClient";
import { device } from "@/styles/screenSizes";
import { useListBox } from "@/utils/hooks";
import AuthorSearchResults from '@/features/AuthorSearchResults/ResultsList';
import { formatQuery } from 'utils/queryString';
import { withRouter } from 'next/router'
import qs from 'qs'
const STRAPI_CLIENT = new StrapiClient();

const StyledFieldsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  @media ${device.tablet} {
    justify-content: space-between;
  }
`;

const StyledSelectContainer = styled.div`
  flex: 0 0 45%;
  margin: 0px;
  width: 100%;
  @media ${device.tablet} {
  }
`;

const StyledBtnContainer = styled.div`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
`;

const StyledFormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const BREADCRUMBS_LIST = [
  {
    href: "/",
    title: "Home",
  },
  {
    href: "/authors",
    title: "Authors",
    isCurrentPage: true,
  },
];

const Authors = (props) => {
  const [authorResults, setAuthorResults] = useState([])
  const [loadingResults, setLoadingResults] = useState(false)
  
  const {
    router,
    authorOptions,
    locationOptions,
    timePeriodOptions
  } = props;

  const { asPath, query } = router;
  const queryString = JSON.stringify(query);
  const queryParams = useMemo(() => qs.parse(query), [queryString]);

  const {
    value: selectedAuthor,
    bind: bindAuthorName,
    reset: resetAuthorName,
  } = useListBox("all");
  const {
    value: authorLocation,
    bind: bindAuthorLocation,
    reset: resetAuthorLocation,
  } = useListBox("all");
  const {
    value: selectedTimePeriod,
    bind: bindSelectedTimePeriod,
    reset: resetSelectedTimePeriod,
  } = useListBox("all");

  useEffect(() => {

    const fetchPageData = async () => {
      if (isMounted) {
        bindAuthorName.onChange(queryParams['id_eq'] || 'all');
        bindAuthorLocation.onChange(queryParams['location.id_eq'] || 'all');
        bindSelectedTimePeriod.onChange(queryParams['timePeriod.id_eq'] || 'all');
        onInitialSearch(queryParams['id_eq'], queryParams['location.id_eq'], queryParams['timePeriod.id_eq']);
      }
    }
    let isMounted = true;

    fetchPageData();
    return () => {
      isMounted = false;
    };
  }, [queryString])

  const onInitialSearch = async (authorValue, locationValue, timeValue) => {
    const searchParams = {
      ...(authorValue !== 'all' && { 'id_eq': authorValue, }),
      ...(locationValue !== 'all' && { 'location.id_eq': locationValue, }),
      ...(timeValue !== 'all' && { 'timePeriod.id_eq': timeValue, }),
    }
    if (authorValue || locationValue || timeValue) {
      try {
        const formattedSearchQuery = formatQuery(searchParams);
        setLoadingResults(true)
        const res = await STRAPI_CLIENT.fetchAPI(`authors?${formattedSearchQuery}`);
        setAuthorResults(res)
        setLoadingResults(false)
      } catch (err) {
        setAuthorResults([])
        setLoadingResults(false)
        throw err
      }
    } else {
      setAuthorResults(authorOptions)
      setLoadingResults(false)
    }
  };

  const onSearch = async (authorValue, locationValue, timeValue) => {
    setLoadingResults(true);
    let newURL = '';
    const searchParams = {
      ...(authorValue !== 'all' && { 'id_eq': authorValue, }),
      ...(locationValue !== 'all' && { 'location.id_eq': locationValue, }),
      ...(timeValue !== 'all' && { 'timePeriod.id_eq': timeValue, }),
    }
    if (authorValue !== 'all' && locationValue !== 'all' && timeValue !== 'all') {
      setAuthorResults(authorOptions)
      setLoadingResults(false)
    } else 
    try {
      const formattedSearchQuery = formatQuery(searchParams);
      newURL = `/authors?${formattedSearchQuery}`;
      const res = await STRAPI_CLIENT.fetchAPI(`authors?${formattedSearchQuery}`);
      setAuthorResults(res)
      router.replace(newURL, undefined, { shallow: true })
      setLoadingResults(false)
    } catch (err) {
      setAuthorResults([])
      setLoadingResults(false)
      throw err
    }
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSearch(selectedAuthor, authorLocation, selectedTimePeriod)
  };

  const handleReset = () => {
    resetAuthorName();
    resetAuthorLocation();
    resetSelectedTimePeriod();
  }

  return (
    <Layout pageTitle='Project Nota | Authors' breadcrumbsList={BREADCRUMBS_LIST}>
      <ContentLayout title="Authors" maxWidth='1000px'>
        <SearchFiltersContainer>
          <form onSubmit={handleSubmit}>
            <StyledFieldsContainer>
                <StyledSelectContainer>
                  <ListBox
                    dataKey="name"
                    allObject={{ name: "All Authors", id: "all" }}
                    labelText="Author"
                    labelValue="author"
                    options={authorOptions}
                    value={selectedAuthor}
                    maxOptionLength={200}
                    {...bindAuthorName}
                  />
                </StyledSelectContainer>
              <StyledFormRow>
                <StyledSelectContainer>
                  <ListBox
                    dataKey="name"
                    allObject={{ name: "All Locations", id: "all" }}
                    labelText="Location"
                    labelValue="author-location"
                    options={locationOptions}
                    value={authorLocation}
                    {...bindAuthorLocation}

                  />
                </StyledSelectContainer>
                <StyledSelectContainer>
                  <ListBox
                    dataKey="name"
                    allObject={{ name: "All Periods", id: "all" }}
                    labelText="Period"
                    labelValue="author-period"
                    options={timePeriodOptions}
                    value={selectedTimePeriod}
                    {...bindSelectedTimePeriod}

                  />
                </StyledSelectContainer>
              </StyledFormRow>
            </StyledFieldsContainer>
            <StyledBtnContainer>
              <PrimaryButton type="submit" text="Search" />
              <SecondaryButton type="reset" text="Clear Fields" onClick={handleReset} />
            </StyledBtnContainer>
          </form>
        </SearchFiltersContainer>
      
          <AuthorSearchResults loading={loadingResults} results={authorResults} />
       
      </ContentLayout>
    </Layout>
  );
};

Authors.propTypes = {
  authorOptions: PropTypes.array,
  locationOptions: PropTypes.array,
  timePeriodOptions: PropTypes.array,
  router: PropTypes.object,
};

export default withRouter(Authors);

export const getStaticProps = async (props) => {
  const { locale } = props;
 
  const authorOptions = await STRAPI_CLIENT.fetchAPI("authors?_sort=name:ASC");
  const locationOptions = await STRAPI_CLIENT.fetchAPI("author-locations?_sort=name:ASC");
  const timePeriodOptions = await STRAPI_CLIENT.fetchAPI('time-periods?_sort=name:ASC');

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "nav", "home"])),
      authorOptions,
      locationOptions,
      timePeriodOptions
    },
  };
};
