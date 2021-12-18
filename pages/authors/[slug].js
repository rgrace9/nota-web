import Layout from '@/components/Layout';
import Container from '@/components/shared/Container';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { fetchStrapiApi } from "@/lib/StrapiClient";
import styled from "@emotion/styled";
import { device } from "@/styles/screenSizes";
import * as colors from 'styles/colors';
import qs from 'qs'
import Link from 'next/link';
import StyledLink from '@/components/shared/Link/StyledLink'
import { useEffect, useState } from 'react';
import { withRouter } from 'next/router'
import PropTypes from "prop-types";
import PageContentWrapper from '@/components/shared/Container/PageContentWrapper';
import  {StyledUnorderedList} from '@/components/shared/List';

const PageWrapper = styled.div`
    display: flex;    
    flex-direction: column;
    justify-content: space-between;
    transition: ease all .5s;
    width: 100%;
`

const StyledPrimaryHeading = styled.h1`
  font-size: 5rem;
  font-weight: 500;
`
const StyledSecondaryHeading = styled.h1`
  font-size: 4rem;
  font-weight: 500;
`

const StyledText = styled.p`
  line-height: 1.5;
  font-size: 2.5rem;
`

const StyledMainContentWrapper = styled.div`
  width: 100%;
  padding-right: 20px;
`

const StyledListContainer = styled.ul`
  padding-left: 40px;
`
const AuthorShow = (props) => {
  const { author, relatedAuthors, router } = props;
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const { asPath, query } = router;
  const { t } = useTranslation('home')
  useEffect(() => {
  
    const previousPageIsSearchPage = globalThis.sessionStorage?.prevPath?.includes('?') || '';
    const BREADCRUMBS_LIST = [
      {
        href: "/",
        title: "Home",
      },
      {
        href: previousPageIsSearchPage ? globalThis.sessionStorage.prevPath : '/authors',
        title: "Authors",
        isCurrentPage: false,
      },
      {
        href: asPath,
        title: author.name,
        isCurrentPage: true,
      },
    ]
    setBreadcrumbs(BREADCRUMBS_LIST)

  }, [])

  return (
    <Layout
      pageTitle={`${author.name} | Project Nota`}
      breadcrumbsList={breadcrumbs}
    >
      <Container>
        <PageContentWrapper title={author.name}>
              <div>
                {author.timePeriod && (
                  <Link href={`/authors?timePeriod.id_eq=${author.timePeriod.id}`} passHref>
                    <StyledLink target='_blank' >
                      {author.timePeriod.name}
                    </StyledLink>
                  </Link>
                )}
              </div>
              {author.location && 
              
              ( 
              <Link href={`/authors?location.id_eq=${author.location.id}`} passHref>
              <StyledLink target='_blank'>
                  {author.location.name}
                </StyledLink>
              </Link>
              )}
              {author.biography ? (
                <section>
                  <StyledSecondaryHeading>Biography</StyledSecondaryHeading>
                  <StyledText>{author.biography}</StyledText>
                </section>
              ) : null}
            {author.lessonPlans.length ?
            (
              <section>
                <StyledSecondaryHeading>Lesson Plans</StyledSecondaryHeading>
                <StyledUnorderedList>
                  {author.lessonPlans.map(lp => (
                    <li
                      key={lp.id}
                    >
                      <StyledLink target='_blank' href={lp.link}>{lp.title}</StyledLink>
                    </li>
                  ))}
                </StyledUnorderedList>
              </section>
            ) : null}
            <section>
              {author.transcriptions ? (
                <>
                  <StyledSecondaryHeading>Transcriptions</StyledSecondaryHeading>
                  <StyledUnorderedList>
                    {author.transcriptions.map(transcription => (
                        <li
                          key={transcription.id}
                        >
                          <StyledLink href={`/transcriptions/${transcription.id}`}>{transcription.title}</StyledLink>
                        </li>
                      ))}
                  </StyledUnorderedList>
                </>
              ) : null}
            </section>
        </PageContentWrapper>
      </Container>
    </Layout>
  );
}

export async function getStaticPaths() {
  const authors = await fetchStrapiApi("authors");

  const paths = authors.map((author) => {
    return {
      params: {
        slug: author.id.toString(),
      },
    }
  })
  return {
    paths,
    fallback: false,
  }
}
export const getStaticProps = async ({ locale, params }) => {
  try {
    const author = await fetchStrapiApi(`authors/${params.slug}`);

    return {
      props: {
        ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
        author,
      }
    }

  } catch (err) {
    return {
      props: {

        error: true
      }
    }
  }
}

AuthorShow.propTypes = {
  author: PropTypes.object
};

export default withRouter(AuthorShow)
