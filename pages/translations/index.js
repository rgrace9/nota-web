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
import TranslationsSearchResults from "@/features/TranslationsSearchResults";


const STRAPI_CLIENT = new StrapiClient();

const Translations = (props) => {
  const {
    router,
    authorOptions,
    translations
  } = props;
  
  const { asPath, query } = router;
  const queryString = JSON.stringify(query);
  const queryParams = useMemo(() => qs.parse(query), [queryString]);

  const handleTranslationsSearch = () => {
    // e.preventDefault();
  };

  return (
    <Layout pageTitle="Translations">
      <ContentLayout maxWidth='1000px' title="Translations">
        <SearchFiltersContainer>
          <form onSubmit={handleTranslationsSearch}>
          <StyledFormRow>
            <StyledOptionContainer>
              <ListBox
                allObject={{ name: "All Authors", id: "all" }}
                labelText="Author"
                labelValue="author"
                options={AUTHOR_OPTIONS}
              />
            </StyledOptionContainer>
          </StyledFormRow>

            <div>
              <PrimaryButton type="submit" text="Search" />
            </div>
          </form>
        </SearchFiltersContainer>
          
           
            <TranslationsSearchResults results={translations} />
         
      </ContentLayout>
    </Layout>
  );
};

Translations.propTypes = {};

export default withRouter(Translations);

export const getStaticProps = async ({ locale }) => {
  const translations = await STRAPI_CLIENT.fetchAPI("translations");
  const authorOptions = await STRAPI_CLIENT.fetchAPI("authors");

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "nav", "home"])),
      translations,
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