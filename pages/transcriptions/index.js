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

  const {
    value: selectedAuthor,
    bind: bindAuthorName,
    reset: resetAuthorName,
  } = useListBox("all");

  const onInitialSearch = async (authorValue) => {
    const searchParams = {
      ...(authorValue !== 'all' && { 'author.id_eq': authorValue, }),
    }
    if (!authorValue) {
      setTranscriptionResults(transcriptions)
      setLoadingResults(false)
    } else {
      try {
        const formattedSearchQuery = formatQuery(searchParams);
        setLoadingResults(true)
        const res = await STRAPI_CLIENT.fetchAPI(`transcriptions?${formattedSearchQuery}`);
        setTranscriptionResults(res)
        setLoadingResults(false)
      } catch (err) {
        setTranscriptionResults([])
        setLoadingResults(false)
        throw err
      }

    }
  };

  const handleTranscriptionsSearch = async (e) => {
    e.preventDefault();
    setLoadingResults(true)
    const searchParams = {
      ...(selectedAuthor !== 'all' && { 'author.id_eq': selectedAuthor }),

    }
    let newURL = '';
    try {
      if (!selectedAuthor === 'all') {
        setTranscriptionResults(transcriptions);
        setLoadingResults(false);
      } else {
        const formattedSearchQuery = formatQuery(searchParams);
        newURL = `/transcriptions?${formattedSearchQuery}`;
        const res = await STRAPI_CLIENT.fetchAPI(`transcriptions?${formattedSearchQuery}`);
        setTranscriptionResults(res) 
      }
      setLoadingResults(false)
      router.replace(newURL, undefined, { shallow: true })

    } catch(err) {
      setTranscriptionResults([])
      setLoadingResults(false)
    }

  };
  useEffect(() => {

    const fetchPageData = async () => {
      if (isMounted) {
        setLoadingResults(true)
        bindAuthorName.onChange(queryParams['author.id_eq'] || 'all');
        onInitialSearch(queryParams['author.id_eq']);
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
          
           
            <TranscriptionsResults loading={loadingResults} results={transcriptionResults} />
         
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
  const transcriptions = await STRAPI_CLIENT.fetchAPI("transcriptions?_sort=title:ASC");
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