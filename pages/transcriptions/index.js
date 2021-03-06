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
import TranscriptionsResults from "@/features/TranscriptionsSearch/SearchResults";

const STRAPI_CLIENT = new StrapiClient();

const AUTHOR_QUERY_KEY = 'author.id_eq';

const THEME_QUERY_KEY = 'themes.id_in';

const GENRE_QUERY_KEY = 'literary_genres.id_in';

const PAGE_SIZE = 1000;

const Transcriptions = (props) => {
  const {
    router,
    authorOptions,
    transcriptions,
    themes,
    literaryGenres
  } = props;
  
  const [transcriptionResults, setTranscriptionResults] = useState([])
  const [loadingResults, setLoadingResults] = useState(false)

  const { query } = router;
  const queryString = JSON.stringify(query);
  const queryParams = useMemo(() => qs.parse(query), [queryString]);

  const {
    value: selectedTheme,
    bind: bindTheme,
    reset: resetTheme,
  } = useListBox("all");
  const {
    value: selectedGenre,
    bind: bindSelectedGenre,
    reset: resetSelectedGenre,
  } = useListBox("all");

  const {
    value: selectedAuthor,
    bind: bindAuthorName,
    reset: resetAuthorName,
  } = useListBox("all");
  const onInitialSearch = async (authorValue, genreValue, themeValue) => {
    const searchParams = {
      ...(authorValue !== 'all' && { [AUTHOR_QUERY_KEY]: authorValue, }),
      ...(themeValue !== 'all' && { [THEME_QUERY_KEY]: themeValue, }),
      ...(genreValue !== 'all' && { [GENRE_QUERY_KEY]: genreValue, }),
    }
    if (!authorValue && !themeValue && !genreValue) {
      setTranscriptionResults(transcriptions)
      setLoadingResults(false)
    } else {
      try {
        const formattedSearchQuery = formatQuery(searchParams);
        setLoadingResults(true)
        const res = await STRAPI_CLIENT.fetchAPI(`transcriptions?${formattedSearchQuery}&_limit=${PAGE_SIZE}`);
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
      ...(selectedAuthor !== 'all' && { [AUTHOR_QUERY_KEY]: selectedAuthor }),
      ...(selectedTheme !== 'all' && { [THEME_QUERY_KEY]: selectedTheme, }),
      ...(selectedGenre !== 'all' && { [GENRE_QUERY_KEY]: selectedGenre, }),
    }
    let newURL = '';
    try {
      if (!selectedAuthor === 'all') {
        setTranscriptionResults(transcriptions);
        setLoadingResults(false);
      } else {
        const formattedSearchQuery = formatQuery(searchParams);
        newURL = `/transcriptions?${formattedSearchQuery}`;
        const res = await STRAPI_CLIENT.fetchAPI(`transcriptions?_sort=title:ASC&${formattedSearchQuery}&_limit=${PAGE_SIZE}`);
        setTranscriptionResults(res) 
      }
      setLoadingResults(false)
      router.replace(newURL, undefined, { shallow: true })

    } catch(err) {
      setTranscriptionResults([])
      setLoadingResults(false)
    }

  };

  const handleReset = () => {
    resetAuthorName();
    resetTheme();
    resetSelectedGenre();
  }

  useEffect(() => {

    const fetchPageData = async () => {
      if (isMounted) {
        setLoadingResults(true)
        bindAuthorName.onChange(queryParams[AUTHOR_QUERY_KEY] || 'all');
        bindSelectedGenre.onChange(queryParams[GENRE_QUERY_KEY] || 'all');
        bindTheme.onChange(queryParams[THEME_QUERY_KEY] || 'all');
        onInitialSearch(queryParams[AUTHOR_QUERY_KEY], queryParams[GENRE_QUERY_KEY], queryParams[THEME_QUERY_KEY]);
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
            <StyledFieldsContainer>              
              <StyledSelectContainer>
                <ListBox
                  dataKey="name"
                  allObject={{ name: "All Authors", id: "all" }}
                  labelText="Author"
                  labelValue="author"
                  maxOptionLength={200}
                  options={authorOptions}
                  value={selectedAuthor}
                  {...bindAuthorName}
                />
              </StyledSelectContainer>
              <StyledFormRow>
                <StyledSelectContainer>
                  <ListBox
                    dataKey="title"
                    allObject={{ title: "All Themes", id: "all" }}
                    labelText="Theme"
                    labelValue="theme"
                    options={themes}
                    value={selectedTheme}
                    {...bindTheme}

                  />
                </StyledSelectContainer>
                <StyledSelectContainer>
                  <ListBox
                    dataKey="title"
                    allObject={{ title: "All Literary Genres", id: "all" }}
                    labelText="Literary Genres"
                    labelValue="literary-genre"
                    options={literaryGenres}
                    value={selectedGenre}
                    {...bindSelectedGenre}

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
          
           
            <TranscriptionsResults loading={loadingResults} results={transcriptionResults} />
         
      </ContentLayout>
    </Layout>
  );
};

Transcriptions.propTypes = {
  transcriptions: PropTypes.array,
  authorOptions: PropTypes.array,
  themes: PropTypes.array,
  literaryGenres: PropTypes.array,
  router: PropTypes.object,
};

export default withRouter(Transcriptions);

export const getStaticProps = async ({ locale }) => {
  const transcriptions = await STRAPI_CLIENT.fetchAPI(`transcriptions?_sort=title:ASC&_limit=${PAGE_SIZE}`);
  
  const authorOptions = await STRAPI_CLIENT.fetchAPI("authors?_sort=name:ASC");

  const themes = await STRAPI_CLIENT.fetchAPI("themes?_sort=title:ASC");
  
  const literaryGenres = await STRAPI_CLIENT.fetchAPI('literary-genres?_sort=title:ASC');


  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "nav", "home"])),
      transcriptions,
      authorOptions,
      themes,
      literaryGenres
    },
  }
};

const StyledFormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

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
