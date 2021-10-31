import Layout from '../../components/Layout';
import Container from '../../components/shared/Container';
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

const PageWrapper = styled.div`
    display: flex;    
    flex-direction: column;
    justify-content: space-between;
    transition: ease all .5s;
    width: 100%;
  @media ${device.tablet} {
    flex: 1;
    flex-direction: row;
  }
`

const StyledPrimaryHeading = styled.h1`
  font-size: 2.8rem;
  font-weight: 500;
`
const StyledSecondaryHeading = styled.h1`
  font-size: 2.4rem;
  font-weight: bold;
`

const StyledText = styled.p`
  line-height: 1.5;
  font-size: 1.6rem;
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
        <PageWrapper>
          <StyledMainContentWrapper>
            <section>
              <StyledPrimaryHeading>{author.name}</StyledPrimaryHeading>
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
              <StyledLink target='_blank' >
                  {author.location.name}
                </StyledLink>
              </Link>
              )}
              
            </section>



            <section>
              <StyledSecondaryHeading>Biography</StyledSecondaryHeading>
              <StyledText>{author.biography}</StyledText>
            </section>
            <section>
              <StyledSecondaryHeading>Lesson Plans</StyledSecondaryHeading>
              <StyledListContainer>
                {author.lessonPlans.map(lp => (
                  <li
                    key={lp.id}
                  >
                    <StyledLink target='_blank' href={lp.link}>{lp.title}</StyledLink>
                  </li>
                ))}
              </StyledListContainer>
            </section>
            <section>
              <StyledSecondaryHeading>Transcriptions</StyledSecondaryHeading>
              {author.transcriptions.map(lp => (
                  <li
                    key={lp.id}
                  >
                    <StyledLink target='_blank' href={lp.link}>{lp.title}</StyledLink>
                  </li>
                ))}
            </section>
            <section>
              <StyledSecondaryHeading>Translations</StyledSecondaryHeading>
              {author.translations.map(lp => (
                  <li
                    key={lp.id}
                  >
                    <StyledLink target='_blank' href={lp.link}>{lp.title}</StyledLink>
                  </li>
                ))}
            </section>
          </StyledMainContentWrapper>

        </PageWrapper>
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
  const author = await fetchStrapiApi(`authors/${params.slug}`);
  try {
    const authorLocation = author.location && author.location.id;
    const authorTimePeriod = author.timePeriod && author.timePeriod.id;
    const query = qs.stringify({ _where: { 'id_ne': author.id, _or: [{ 'timePeriod.id_eq': authorTimePeriod }, { 'location.id_eq': authorLocation }] } })
    const relatedAuthors = await fetchStrapiApi(`authors?${query}`);

    return {
      props: {
        ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
        author,
        relatedAuthors
      }
    }

  } catch (err) {
    return {
      props: {
        author,
        relatedAuthors: []
      }
    }
  }
}

AuthorShow.propTypes = {
  author: PropTypes.object
};

export default withRouter(AuthorShow)
