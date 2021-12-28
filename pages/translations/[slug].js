import PropTypes from 'prop-types';
import Layout from '@/components/Layout';
import Container from '@/components/shared/Container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { fetchStrapiApi } from "@/lib/StrapiClient";
import styled from "@emotion/styled";
import Link from 'next/link';
import StyledLink from '@/components/shared/Link/StyledLink'
import React from 'react';
import { withRouter } from 'next/router';
import PageContentWrapper from '@/components/shared/Container/PageContentWrapper';
import SectionContent from '@/components/shared/SectionContent';

const TranslationShow = props => {

  const {
    translation,
    router
  } = props;


  const StyledSecondaryHeading = styled.h2`
    font-size: 4rem;
    font-weight: 500;
    scroll-margin-top: 100px;
  `

  const { asPath } = router;

  const BREADCRUMBS_LIST = [
    {
      href: "/",
      title: "Home",
    },
    {
      href: '/translations',
      title: "Translations",
      isCurrentPage: false,
    },
    {
      href: asPath,
      title: translation.title,
      isCurrentPage: true,
    },
  ]

  return (
    <Layout
    pageTitle={`${translation.title} | Project Nota`}
    breadcrumbsList={BREADCRUMBS_LIST}
    >
      <Container>
        <PageContentWrapper title={translation.title}>
          {translation.authorName ? (
            <Link href={`/authors/${translation.authorId}`} passHref>
                <StyledLink>{translation.authorName}</StyledLink>
            </Link>
          ) : null}
          <div className='p-t-10'>
            <StyledLink href={translation.link} target='_blank' rel='noreferrer'>View PDF</StyledLink>
          </div>
          <SectionContent title='Description' body={translation.description} />
          <SectionContent title='Translation' body={translation.body}  />
          {translation.transcription ? (
            <>
              <StyledSecondaryHeading className='p-t-20'>Transcription</StyledSecondaryHeading>
              <StyledLink className='m-t-20' href={`/transcriptions/${translation.transcription?.id}`}>{translation.title}</StyledLink>
            </>
          ) : null}
          <SectionContent title='Acknowledgements' body={translation.acknowledgement}/>
        </PageContentWrapper>
      </Container>
    </Layout>
  );
};

TranslationShow.propTypes = {
  translation: PropTypes.shape({
    authorName: PropTypes.string,
    authorId: PropTypes.id,
    acknowledgement: PropTypes.string,
    title: PropTypes.string,
    transcription: PropTypes.object,
    description: PropTypes.string,
    body: PropTypes.string,
    link: PropTypes.string,
  }),
  router: PropTypes.object,
};

export async function getStaticPaths() {
  const translations = await fetchStrapiApi("translations?_limit=1000");

  const paths = translations.map((translation) => {
    return {
      params: {
        slug: translation.id.toString(),
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
    const translation = await fetchStrapiApi(`translations/${params.slug}`);
 
    return {
      props: {
        ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
        translation,
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

export default withRouter(TranslationShow);