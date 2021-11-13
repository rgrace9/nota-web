import PropTypes from 'prop-types';
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
import React, { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import {DefaultText} from '@/components/shared/Paragraph/StyledText';
import PageContentWrapper from '@/components/shared/Container/PageContentWrapper';
const Transcription = props => {

  const {
    transcription,
    error,
    router
  } = props;
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const { asPath, query } = router;

  useEffect(() => {
  
    const previousPageIsSearchPage = globalThis.sessionStorage?.prevPath?.includes('?') || '';
    const BREADCRUMBS_LIST = [
      {
        href: "/",
        title: "Home",
      },
      {
        href: previousPageIsSearchPage ? globalThis.sessionStorage.prevPath : '/authors',
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

  console.log('transcription', transcription)
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
      <DefaultText className='p-t-20'>{transcription.description}</DefaultText>
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