import React from 'react';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {SearchFiltersContainer} from '@/components/shared/SearchFilters';
import styled from '@emotion/styled';
import Layout from '@/components/Layout';
import ContentLayout from '@/components/Layout/ContentLayout';
import {ListBox} from '@/components/shared/dataEntry';
import {AUTHOR_OPTIONS, AUTHOR_LOCATIONS} from '@/constants/index';
import {PrimaryButton} from '@/components/shared/Button';
import StrapiClient from '@/lib/StrapiClient';
import {device} from '@/styles/screenSizes';

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
`

const StyledSelectContainer = styled.div`
flex: 1 1 auto;
    margin: 0px;
width: 100%;
@media ${device.tablet} {
  width: 50%;
  margin: 15px;
  }
`

const StyledBtnContainer = styled.div`
  text-align: center;
`

const BREADCRUMBS_LIST = [
  {
    href: '/',
    title: 'Home'
  },
  {
    href: '/authors',
    title: 'Authors',
    isCurrentPage: true
  },
]
const Authors = props => {
  console.log({props})
  const {data: {authors, locations}} = props;


  return (
    <Layout
      pageTitle='Authors'
      breadcrumbsList={BREADCRUMBS_LIST}
    >
      <ContentLayout
        title='Authors'
      >
                <SearchFiltersContainer>
          <form>
            <StyledFieldsContainer>
              <StyledSelectContainer>
            <ListBox labelText='Author' labelValue='author' options={authors}/>

              </StyledSelectContainer>
              <StyledSelectContainer>
            <ListBox labelText='Location' labelValue='author-location' options={AUTHOR_LOCATIONS}/>

              </StyledSelectContainer>

            </StyledFieldsContainer>
            <StyledBtnContainer><PrimaryButton type='submit' text='Search'/></StyledBtnContainer>

          </form>
        </SearchFiltersContainer>
      </ContentLayout>
    </Layout>
  );
};

Authors.propTypes = {
  
};

export default Authors;

export const getStaticProps = async (props) => {
  const { locale } = props;

  const authors = await STRAPI_CLIENT.fetchAPI('authors');
  const locations = await STRAPI_CLIENT.fetchAPI('author-locations');

  return {
    props: {
      ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
      data: {
        authors,
        locations
      }
    }
  }
}