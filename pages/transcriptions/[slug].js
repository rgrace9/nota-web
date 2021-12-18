import PropTypes from 'prop-types';
import Layout from '@/components/Layout';
import Container from '@/components/shared/Container';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { fetchStrapiApi } from "@/lib/StrapiClient";
import styled from "@emotion/styled";
import { device } from "@/styles/screenSizes";
import * as colors from 'styles/colors';
import  {StyledUnorderedList} from '@/components/shared/List';
import Link from 'next/link';
import StyledLink from '@/components/shared/Link/StyledLink'
import React, { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
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
    font-size: 2.5rem;
  `

  const StyledSecondaryHeading = styled.h2`
    font-size: 4rem;
    font-weight: 500;
    scroll-margin-top: 100px;
  `

  const { asPath } = router;

  useEffect(() => {
  
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
    setBreadcrumbs(BREADCRUMBS_LIST)

  }, [])

  return (
    <Layout
    pageTitle={`${transcription.title} | Project Nota`}
    breadcrumbsList={breadcrumbs}
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
      {transcription.description ? (
        <>
                  <StyledSecondaryHeading className='p-t-20'>Description</StyledSecondaryHeading>
        <DefaultText className='p-t-10'>{transcription.description}</DefaultText>
        </>

      ) : null}
      

      {transcription.originalText ? (
        <>
          <StyledSecondaryHeading className='p-t-20'>Original Text</StyledSecondaryHeading>
          <StyledLink target='_blank' href={transcription.originalTextLink}>{transcription.originalText}</StyledLink>
        </>

      ) : null}
        <StyledSecondaryHeading className='p-t-20' id='transcription'>Transcription</StyledSecondaryHeading>
      <StyledTranscription
          className='p-t-10 p-b-40'
          dangerouslySetInnerHTML={
            { __html: transcription.body }
          }
      />
      {transcription.translations.length ? (
        <>
          <StyledSecondaryHeading className='p-t-20' id='transcription'>Translation{transcription.translations.length !== 1 ? 's' : ''}</StyledSecondaryHeading>
          <StyledUnorderedList>
            {transcription.translations.map(translation => (
                <li key={translation.id}>
                  <StyledLink className='m-t-20' href={`/translations/${translation?.id}`}>{translation.title}</StyledLink>
                </li>
            ))}
          </StyledUnorderedList>
        
        </>
        

      ) : null}
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