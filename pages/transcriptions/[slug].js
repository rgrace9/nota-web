import PropTypes from 'prop-types';
import Layout from '@/components/Layout';
import Container from '@/components/shared/Container';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { fetchStrapiApi } from "@/lib/StrapiClient";
import styled from "@emotion/styled";
import { device } from "@/styles/screenSizes";
import * as colors from 'styles/colors';
import {StyledHeadingLinkContainer, StyledAnchorLink} from '@/components/shared/HeadingLink/StyledHeadingLink';
import Link from 'next/link';
import StyledLink from '@/components/shared/Link/StyledLink'
import React, { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import {StyledSecondaryHeading} from '@/components/shared/Heading/StyledHeadings';
import {DefaultText} from '@/components/shared/Paragraph/StyledText';
import PageContentWrapper from '@/components/shared/Container/PageContentWrapper';
import ChainLink from '@/components/shared/Icon/ChainLink';
const Transcription = props => {

  const {
    transcription,
    error,
    router
  } = props;
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const StyledTranscription = styled.div`
    white-space: pre-wrap;
    font-size: 1.6rem;
  `
  const { asPath, query } = router;
  // todo - add links to the headings so that there is navigation within the page.

  useEffect(() => {
  
    const previousPageIsSearchPage = globalThis.sessionStorage?.prevPath?.includes('?') || '';
    const BREADCRUMBS_LIST = [
      {
        href: "/",
        title: "Home",
      },
      {
        href: previousPageIsSearchPage ? globalThis.sessionStorage.prevPath : '/transcriptions',
        title: "Transcriptions",
        isCurrentPage: false,
      },
      {
        href: asPath,
        title: transcription.title,
        isCurrentPage: true,
      },
    ]
    setBreadcrumbs(BREADCRUMBS_LIST)

  }, [])

  return (
    <Layout
    pageTitle={`${transcription.title} | Project Nota`}
    breadcrumbsList={breadcrumbs}
  >
    <Container>
      <PageContentWrapper title={transcription.title}>
      <Link href={`/authors/${transcription.author.id}`} passHref>

          <StyledLink>{transcription.author.name}</StyledLink>
      </Link>
      <div className='p-t-10'>
        <StyledLink href={transcription.link} target='_blank' rel='noreferrer'>View PDF</StyledLink>

      </div>
      <StyledSecondaryHeading id='description' className='p-t-20'>Description</StyledSecondaryHeading>
      <DefaultText className='p-t-10'>{transcription.description}</DefaultText>
      
      <StyledHeadingLinkContainer>
        <StyledSecondaryHeading className='p-t-20' id='transcription'>Transcription</StyledSecondaryHeading>
        <StyledAnchorLink href='#transcription'><ChainLink /></StyledAnchorLink>
      </StyledHeadingLinkContainer>
      <StyledTranscription
          className='p-t-10'
          dangerouslySetInnerHTML={
            { __html: transcription.body }
          }
      />
      <StyledSecondaryHeading className='p-t-20'>Translations</StyledSecondaryHeading>
      </PageContentWrapper>
    </Container>
    </Layout>
  );
};

Transcription.propTypes = {
  
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