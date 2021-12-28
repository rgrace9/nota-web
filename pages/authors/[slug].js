import Layout from '@/components/Layout';
import Container from '@/components/shared/Container';
import {DefaultText} from '@/components/shared/Paragraph/StyledText';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { fetchStrapiApi } from "@/lib/StrapiClient";
import styled from "@emotion/styled";
import Link from 'next/link';
import StyledLink from '@/components/shared/Link/StyledLink'
import { withRouter } from 'next/router'
import PropTypes from "prop-types";
import PageContentWrapper from '@/components/shared/Container/PageContentWrapper';
import SectionContent from '@/components/shared/SectionContent';
import SectionList from '@/components/shared/SectionList';


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
  const { author, router } = props;

  const { asPath } = router;

  const BREADCRUMBS_LIST = [
    {
      href: "/",
      title: "Home",
    },
    {
      href: '/authors',
      title: "Authors",
      isCurrentPage: false,
    },
    {
      href: asPath,
      title: author.name,
      isCurrentPage: true,
    },
  ]

  return (
    <Layout
      pageTitle={`${author.name} | Project Nota`}
      breadcrumbsList={BREADCRUMBS_LIST}
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
              (<Link href={`/authors?location.id_eq=${author.location.id}`} passHref>
                <StyledLink target='_blank'>
                  {author.location.name}
                </StyledLink>
              </Link>
              )}
              {author.date ? (
                <DefaultText>{author.date}</DefaultText>
              ) : null}
              <SectionContent 
                title='Biography'
                body={author.biography || author.shortBiography}
              />
              
              <SectionList
                title={`Lesson Plan${author.lessonPlans.length !== 1 ? 's' : ''}`}
                listLength={author.lessonPlans.length}
              >
                {author.lessonPlans.map(lessonPlan => (
                  <li key={lessonPlan.id}>
                    <StyledLink href={lessonPlan.link}>{lessonPlan.title}</StyledLink>
                  </li>
                ))}
              </SectionList>

              <SectionList
                title={`Transcription${author.transcriptions.length !== 1 ? 's' : ''}`}
                listLength={author.transcriptions.length}
              >
                {author.transcriptions.map(transcription => (
                  <li key={transcription.id}>
                    <Link href={`/transcriptions/${transcription.id}`} passHref>
                      <StyledLink >{transcription.title}</StyledLink>
                    </Link>
                  </li>
                ))}
              </SectionList>
              <SectionContent 
                title='Acknowledgements'
                body={author.acknowledgement}
              />
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
  author: PropTypes.object,
  router: PropTypes.object,
};

export default withRouter(AuthorShow)
