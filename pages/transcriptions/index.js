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
import TranscriptionsResults from "@/features/TranscriptionsSearch/SearchResults";


const STRAPI_CLIENT = new StrapiClient();

const Transcriptions = (props) => {
  const {
    router,
    authorOptions,
    transcriptions
  } = props;
  
  const [transcriptionResults, setTranscriptionResults] = useState([])
  const [loadingResults, setLoadingResults] = useState(false)

  const { asPath, query } = router;
  const queryString = JSON.stringify(query);
  const queryParams = useMemo(() => qs.parse(query), [queryString]);

  console.log(queryString)
  const {
    value: selectedAuthor,
    bind: bindAuthorName,
    reset: resetAuthorName,
  } = useListBox("all");

  const handleTranscriptionsSearch = () => {
    // e.preventDefault();
  };
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

  return (
    <Layout pageTitle="Transcriptions">
      <ContentLayout maxWidth='1000px' title="Transcriptions">
        <SearchFiltersContainer>
          <form onSubmit={handleTranscriptionsSearch}>
          <StyledFormRow>
            <StyledOptionContainer>
              <ListBox
                allObject={{ name: "All Authors", id: "all" }}
                labelText="Author"
                labelValue="author"
                options={authorOptions}
              />
            </StyledOptionContainer>
          </StyledFormRow>

            <div>
              <PrimaryButton type="submit" text="Search" />
            </div>
          </form>
        </SearchFiltersContainer>
          
           
            <TranscriptionsResults results={transcriptions} />
         
      </ContentLayout>
    </Layout>
  );
};

Transcriptions.propTypes = {
  transcriptions: PropTypes.array,
  authorOptions: PropTypes.array
};

export default withRouter(Transcriptions);

export const getStaticProps = async ({ locale }) => {
  const transcriptions = await STRAPI_CLIENT.fetchAPI("transcriptions");
  const authorOptions = await STRAPI_CLIENT.fetchAPI("authors");

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "nav", "home"])),
      transcriptions,
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