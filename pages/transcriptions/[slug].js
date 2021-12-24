import PropTypes from 'prop-types';
import Layout from '@/components/Layout';
import Container from '@/components/shared/Container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { fetchStrapiApi } from "@/lib/StrapiClient";
import styled from "@emotion/styled";
import  {StyledUnorderedList} from '@/components/shared/List';
import Link from 'next/link';
import StyledLink from '@/components/shared/Link/StyledLink'
import React from 'react';
import { withRouter } from 'next/router';
import PageContentWrapper from '@/components/shared/Container/PageContentWrapper';
import SectionContent from '@/components/shared/SectionContent';
import SectionList from '@/components/shared/SectionList';
const Transcription = props => {

  const {
    transcription,
    router
  } = props;

  const StyledSecondaryHeading = styled.h2`
    font-size: 4rem;
    font-weight: 500;
  `

  const { asPath } = router;

  const BREADCRUMBS_LIST = [
    {
      href: "/",
      title: "Home",
    },
    {
      href: '/transcriptions',
      title: "Transcriptions",
      isCurrentPage: false,
    },
    {
      href: asPath,
      title: transcription.title,
      isCurrentPage: true,
    },
  ]

  return (
    <Layout
      pageTitle={`${transcription.title} | Project Nota`}
      breadcrumbsList={BREADCRUMBS_LIST}
    >
    <Container>
      <PageContentWrapper title={transcription.title}>
        {transcription.author ? (
          <Link href={`/authors/${transcription.author.id}`} passHref>

              <StyledLink>{transcription.author.name}</StyledLink>
          </Link>
        ) : null}
        <div className='p-t-10'>
          <StyledLink href={transcription.link} target='_blank' rel='noreferrer'>View PDF</StyledLink>

        </div>
        <SectionContent 
          title='Description'
          body={transcription.description}
        />
        {transcription.originalText ? (
          <>
            <StyledSecondaryHeading className='p-t-20'>Original Text</StyledSecondaryHeading>
            <StyledLink target='_blank' href={transcription.originalTextLink}>{transcription.originalText}</StyledLink>
          </>
        ) : null}
        <SectionContent 
          title='Transcription'
          body={transcription.body}
        />
        <SectionList
          title={`Translation${transcription.translations.length !== 1 ? 's' : ''}`}
          listLength={transcription.translations.length}
        >
          {transcription.translations.map(translation => (
            <li key={translation.id}>
              <StyledLink href={`/translations/${translation?.id}`}>{translation.title}</StyledLink>
            </li>
          ))}
        </SectionList>
        <SectionContent 
          title='Acknowledgements'
          body={transcription.acknowledgement}
        />
        </PageContentWrapper>
      </Container>
    </Layout>
  );
};

Transcription.propTypes = {
  router: PropTypes.object,
  transcription: PropTypes.shape({
    author: PropTypes.object,
    title: PropTypes.string,
    translations: PropTypes.array,
    body: PropTypes.string,
    description: PropTypes.string,
    originalText: PropTypes.string,
    originalTextLink: PropTypes.string,
    link: PropTypes.string,
    acknowledgement: PropTypes.string
  }),
};

export async function getStaticPaths() {
  const transcriptions = await fetchStrapiApi("transcriptions");

  const paths = transcriptions.map((transcription) => {
    return {
      params: {
        slug: transcription.id.toString(),
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
    const transcription = await fetchStrapiApi(`transcriptions/${params.slug}`);
 
    return {
      props: {
        ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
        transcription,
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

export default withRouter(Transcription);