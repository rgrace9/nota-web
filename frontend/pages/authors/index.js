import React from "react";
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
import {createQueryString} from 'utils/queryString';

const STRAPI_CLIENT = new StrapiClient();

const StyledFieldsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  @media ${device.tablet} {
    justify-content: space-between;
    flex-direction: row;
  }
  /* padding: 5px;
    margin: 10px; */
`;

const StyledSelectContainer = styled.div`
  flex: 1 1 auto;
  margin: 0px;
  width: 100%;
  @media ${device.tablet} {
    width: 50%;
    margin: 15px;
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
const Authors = (props) => {
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
  
  const {
    data: { authors, locations, timePeriods },
  } = props;

  const onSearch = (authorValue, locationValue) => {
    const searchParams = {
      'id_eq': authorValue,
      'location.id_eq': locationValue
    }
    const testing = createQueryString(searchParams);
    console.log(testing)
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(selectedAuthor, authorLocation)
    onSearch(selectedAuthor, authorLocation)
   
  };

  return (
    <Layout pageTitle='Project Nota | Authors' breadcrumbsList={BREADCRUMBS_LIST}>
      <ContentLayout title="Authors">
        <SearchFiltersContainer>
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

        <AuthorSearchResults results={authors} />
      </ContentLayout>
    </Layout>
  );
};

Authors.propTypes = {};

export default Authors;

export const getStaticProps = async (props) => {
  const { locale } = props;

  const authors = await STRAPI_CLIENT.fetchAPI("authors");
  const locations = await STRAPI_CLIENT.fetchAPI("author-locations");
  const timePeriods = await STRAPI_CLIENT.fetchAPI('time-periods')
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "nav", "home"])),
      data: {
        authors,
        locations,
        timePeriods
      },
    },
  };
};
