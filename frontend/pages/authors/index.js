import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SearchFiltersContainer } from "@/components/shared/SearchFilters";
import styled from "@emotion/styled";
import Layout from "@/components/Layout";
import ContentLayout from "@/components/Layout/ContentLayout";
import { ListBox } from "@/components/shared/dataEntry";
import { AUTHOR_OPTIONS, AUTHOR_LOCATIONS } from "@/constants/index";
import { PrimaryButton } from "@/components/shared/Button";
import StrapiClient from "@/lib/StrapiClient";
import { device } from "@/styles/screenSizes";
import { useListBox } from "@/utils/hooks";
import AuthorSearchResults from '@/features/AuthorSearchResults/ResultsList';
import { createQueryString, formatQuery } from 'utils/queryString';
import { useRouter, withRouter } from 'next/router'
import qs from 'qs'
import Container from '@/components/shared/Container'

const STRAPI_CLIENT = new StrapiClient();

const StyledFieldsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  @media ${device.tablet} {
    justify-content: space-between;
    /* flex-direction: row; */
  }
  /* padding: 5px;
    margin: 10px; */
`;

const StyledSelectContainer = styled.div`
  flex: 1 1 auto;
  margin: 0px;
  width: 100%;
  @media ${device.tablet} {
    /* width: 50%; */
    /* margin: 15px; */
  }
`;

const StyledBtnContainer = styled.div`
  text-align: center;
`;

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

const INITIAL_DATA = {
  authors: [],
  locations: [],
  timePeriods: [],
  isError: false,
  isLoading: false
}
const Authors = (props) => {
  const [authorResults, setAuthorResults] = useState([])
  const [loadingResults, setLoadingResults] = useState(false)
  const [searchQuery, setSearchQuery] = useState({});
  const [data, setData] = useState(INITIAL_DATA)

  const {
    router
  } = props;
  const {
    authors, locations, timePeriods
  } = data;
  const { pathname, query } = router;
  const queryParams = useMemo(() => qs.parse(query), [query]);
 
  const queryString = JSON.stringify(query);

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
      try {
        if (isMounted) {
      
          setSearchQuery(queryParams)
          bindAuthorName.onChange(queryParams['id_eq'] || 'all');
          
          bindAuthorLocation.onChange(queryParams['location.id_eq'] || 'all');
          bindSelectedTimePeriod.onChange(queryParams['timePeriod.id_eq'] || 'all');
          onSearch(queryParams['id_eq'], queryParams['location.id_eq'], queryParams['timePeriod.id_eq']);

        }
      } catch (err) {

        throw err;
      }
    }
    let isMounted = true;

    fetchPageData();
    return () => {
      isMounted = false;
    };
  }, [queryString])

  useEffect(() => {

    const fetchPageData = async () => {

      try {
        setData(prevState => {
          return {
            ...prevState,
            isLoading: true
          }
        })
        const authors = await STRAPI_CLIENT.fetchAPI("authors");
        const locations = await STRAPI_CLIENT.fetchAPI("author-locations");
        const timePeriods = await STRAPI_CLIENT.fetchAPI('time-periods');
        
          setData(prevState => {
            return {
              ...prevState,
              isLoading: false,
              authors,
              locations,
              timePeriods
            }
          })
      } catch (err) {

        throw err;
      }
    }

    fetchPageData();

  }, [])

  
  const onSearch = async (authorValue, locationValue, timeValue) => {

    try {
      const searchParams = {
        ...(authorValue !== 'all' && { 'id_eq': authorValue, }),
        ...(locationValue !== 'all' && { 'location.id_eq': locationValue, }),
        ...(timeValue !== 'all' && { 'timePeriod.id_eq': timeValue, }),
      }
      const formattedSearchQuery = formatQuery(searchParams)
      const newURL = `authors?${formattedSearchQuery}`;
      const res = await STRAPI_CLIENT.fetchAPI(`authors?${formattedSearchQuery}`);
      router.push(newURL)

      setAuthorResults(res)
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

  return (
    <Layout loading={data.isLoading} pageTitle='Project Nota | Authors' breadcrumbsList={BREADCRUMBS_LIST}>
      <ContentLayout title="Authors">
        <SearchFiltersContainer loading={data.isLoading}>
          <form onSubmit={handleSubmit}>
            <StyledFieldsContainer>
              <StyledSelectContainer>
                <ListBox
                  dataKey="name"
                  allObject={{ name: "All Authors", id: "all" }}
                  labelText="Author"
                  labelValue="author"
                  options={authors}
                  value={selectedAuthor}
                  {...bindAuthorName}
                />
              </StyledSelectContainer>
              <StyledSelectContainer>
                <ListBox
                  dataKey="name"
                  allObject={{ name: "All Locations", id: "all" }}
                  labelText="Location"
                  labelValue="author-location"
                  options={locations}
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
                  options={timePeriods}
                  value={selectedTimePeriod}
                  {...bindSelectedTimePeriod}

                />
              </StyledSelectContainer>
            </StyledFieldsContainer>
            <StyledBtnContainer>
              <PrimaryButton type="submit" text="Search" />
            </StyledBtnContainer>
          </form>
        </SearchFiltersContainer>
        <Container>
          <AuthorSearchResults loading={loadingResults} results={authorResults} />
        </Container>
      </ContentLayout>
    </Layout>
  );
};

Authors.propTypes = {};

export default withRouter(Authors);

export const getStaticProps = async (props) => {
  const { locale } = props;

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "nav", "home"])),
    },
  };
};
