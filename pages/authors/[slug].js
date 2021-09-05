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


const RelatedContentContainer = styled.aside`
  background: ${colors.silver};
  flex: 1;
  flex-direction: row;
  padding: 10px;
  max-width: 320px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  height: 50vh;
  min-height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
  @media ${device.tablet} {
    flex: 0 0 20em;
    
  }
  @media ${device.desktop} {
    flex: 0 0 20em;
  }
`

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
  font-size: 28px;
  font-weight: 500;
`
const StyledSecondaryHeading = styled.h1`
  font-size: 24px;
`

const StyledText = styled.p`
  line-height: 1.5;
  font-size: 16px;
`

const StyledMainContentWrapper = styled.div`
  width: 100%;
  padding-right: 20px;
`

const StyledListContainer = styled.ul`
  padding-left: 40px;
`
export default function Home(props) {
  const storage = globalThis?.sessionStorage?.currentPath;
  const { author, relatedAuthors } = props;
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const { t } = useTranslation('home')
  useEffect(() => {
    const previousPageIsSearchPage = globalThis.sessionStorage.prevPath.includes('?');
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
        href: globalThis.sessionStorage.currentPath,
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
              <p>{author.timePeriod && author.timePeriod.name}</p>
              <p>{author.location && 
              
              ( 
              <Link href={`/authors?location.id_eq=${author.location.id}`} passHref>
              <StyledLink target='_blank' >
                  {author.location.name}
                </StyledLink>
              </Link>
              )}
              </p>
            </section>



            <section>
              <StyledSecondaryHeading>Biography</StyledSecondaryHeading>
              <StyledText>{author.biography}</StyledText>
              <StyledLink href='https://9cc615d0-1255-4689-b262-e5224d896f89.filesusr.com/ugd/a8964a_5cc26c4bf53e44e998eb2330913d66fc.pdf' target='_blank'>Learn More about {author.name}</StyledLink>
            </section>
            <section>
              <StyledSecondaryHeading>Lesson Plans</StyledSecondaryHeading>
              <StyledListContainer>
                {author.lessonPlans.map(lp => (
                  <li
                    key={lp.slug}
                  >
                    <Link href={`/lesson-plans/${lp.slug}`} passHref>
                      <StyledLink target='_blank' href={`/lesson-plans/${lp.slug}`}>{lp.title}</StyledLink>
                    </Link>
                  </li>
                ))}
              </StyledListContainer>
            </section>
            <section>
              <StyledSecondaryHeading>Transcriptions</StyledSecondaryHeading>
              {/* <StyledText>{author.biography}</StyledText> */}
            </section>

          </StyledMainContentWrapper>
          <RelatedContentContainer>
            <StyledSecondaryHeading>Related Authors</StyledSecondaryHeading>
            <ul>
              {relatedAuthors.map(relatedAuthor => (
                <li key={relatedAuthor.id}>
                  <Link href={`/authors/${relatedAuthor.id}`} passHref>
                    <StyledLink href={`/authors/${relatedAuthor.id}`}>
                      {relatedAuthor.name}
                    </StyledLink>
                  </Link>
                </li>
              ))}
            </ul>
          </RelatedContentContainer>

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
        ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
        author,
        relatedAuthors: []
      }
    }
  }
}