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
import TranslationsSearchResults from "@/features/TranslationsSearchResults";


const STRAPI_CLIENT = new StrapiClient();

const AUTHOR_QUERY_KEY = 'author.id_eq';

const THEME_QUERY_KEY = 'transcription.themes.id_in';

const GENRE_QUERY_KEY = 'transcription.literary_genres.id_in';

const TRANSLATION_QUERY_KEY = 'language.id_eq';

const PAGE_SIZE = 1000;

const Translations = (props) => {
  const {
    router,
    authorOptions,
    translations,
    themes,
    literaryGenres,
    translationLanguages
  } = props;
  
  const [translationResults, setTranslationsResults] = useState([]);
  const [resultsCount, setResultsCount] = useState(0);

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
    value: selectedLanguage,
    bind: bindTranslationLanguage,
    reset: resetTranslationLanguage,
  } = useListBox("all");

  const onInitialSearch = async (authorValue, genreValue, themeValue, languageValue) => {
    const searchParams = {
      ...(authorValue !== 'all' && { [AUTHOR_QUERY_KEY]: authorValue }),
      ...(themeValue !== 'all' && { [THEME_QUERY_KEY]: themeValue }),
      ...(genreValue !== 'all' && { [GENRE_QUERY_KEY]: genreValue }),
      ...(languageValue !== 'all' && { [TRANSLATION_QUERY_KEY]: languageValue }),
    }
  
    if (!authorValue && !themeValue && !genreValue && !languageValue) {
      setTranslationsResults(translations)
      setLoadingResults(false)
    } else {
      try {
        const formattedSearchQuery = formatQuery(searchParams);
      
        setLoadingResults(true);

        const res = await STRAPI_CLIENT.fetchAPI(`translations?_sort=title:ASC&${formattedSearchQuery}&_limit=${PAGE_SIZE}`);
  
        setTranslationsResults(res)
        setLoadingResults(false)
      } catch (err) {
        setTranslationsResults([])
        setLoadingResults(false)
        throw err
      }
    }
  };

  const handleTranslationsSearch = async (e) => {
    e.preventDefault();
    try {
      setLoadingResults(true)
      const searchParams = {
        ...(selectedAuthor !== 'all' && { [AUTHOR_QUERY_KEY]: selectedAuthor }),
        ...(selectedTheme !== 'all' && { [THEME_QUERY_KEY]: selectedTheme }),
        ...(selectedGenre !== 'all' && { [GENRE_QUERY_KEY]: selectedGenre }),
        ...(selectedLanguage !== 'all' && { [TRANSLATION_QUERY_KEY]: selectedLanguage }),
      }
      const formattedSearchQuery = formatQuery(searchParams);
      const newURL = `/translations?${formattedSearchQuery}`;
      const res = await STRAPI_CLIENT.fetchAPI(`translations?${formattedSearchQuery}&_limit=${PAGE_SIZE}`);
      setTranslationsResults(res)
      setLoadingResults(false)
      router.replace(newURL, undefined, { shallow: true })

    } catch(err) {
      setTranslationsResults([])
      setLoadingResults(false)
    }
  };

  useEffect(() => {
    const fetchPageData = async () => {
      if (isMounted) {
        setLoadingResults(true)
        bindAuthorName.onChange(queryParams[AUTHOR_QUERY_KEY] || 'all');
        bindSelectedGenre.onChange(queryParams[GENRE_QUERY_KEY] || 'all');
        bindTheme.onChange(queryParams[THEME_QUERY_KEY] || 'all');
        bindTranslationLanguage.onChange(queryParams[TRANSLATION_QUERY_KEY] || 'all');
        onInitialSearch(queryParams[AUTHOR_QUERY_KEY], queryParams[GENRE_QUERY_KEY], queryParams[THEME_QUERY_KEY], queryParams[TRANSLATION_QUERY_KEY]);
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
    resetTheme();
    resetSelectedGenre();
    resetTranslationLanguage();
  }

  return (
    <Layout pageTitle="Translations">
      <ContentLayout maxWidth='1000px' title="Translations">
        <SearchFiltersContainer>
          <form onSubmit={handleTranslationsSearch}>
            <StyledFieldsContainer>
              <StyledFormRow>
                <StyledSelectContainer>
                  <ListBox
                    dataKey="name"
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
                    options={translationLanguages}
                    value={selectedLanguage}
                    {...bindTranslationLanguage}
                  />
                </StyledSelectContainer>
              </StyledFormRow>
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
                    labelText="Literary Genre"
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
        <TranslationsSearchResults loading={loadingResults} results={translationResults} />
      </ContentLayout>
    </Layout>
  );
};

Translations.propTypes = {
  translations: PropTypes.array,
  authorOptions: PropTypes.array,
  themes: PropTypes.array,
  literaryGenres: PropTypes.array,
  translationLanguages: PropTypes.array,
  router: PropTypes.object,
};

Translations.defaultProps = {
  translations: [],
  authorOptions: [],
  themes: [],
  literaryGenres: [],
  translationLanguages: [],
};

export default withRouter(Translations);

export const getStaticProps = async ({ locale }) => {
  const translations = await STRAPI_CLIENT.fetchAPI(`translations?_sort=title:ASC&_limit=${PAGE_SIZE}`);
  
  const authorOptions = await STRAPI_CLIENT.fetchAPI("authors?_sort=name:ASC");

  const themes = await STRAPI_CLIENT.fetchAPI("themes?_sort=title:ASC");
  
  const literaryGenres = await STRAPI_CLIENT.fetchAPI('literary-genres?_sort=title:ASC');
  
  const translationLanguages = await STRAPI_CLIENT.fetchAPI('translation-languages?_sort=name:ASC');

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "nav", "home"])),
      translations,
      authorOptions,
      themes,
      literaryGenres,
      translationLanguages
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
`;

const StyledBtnContainer = styled.div`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
`;