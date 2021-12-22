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
import {DefaultText} from '@/components/shared/Paragraph/StyledText';
import PageContentWrapper from '@/components/shared/Container/PageContentWrapper';
import ChainLink from '@/components/shared/Icon/ChainLink';
const TranslationShow = props => {

  const {
    translation,
    error,
    router
  } = props;
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const StyledTranslation = styled.div`
    white-space: pre-wrap;
    font-size: 2.5rem;
  `

  const StyledSecondaryHeading = styled.h2`
    font-size: 4rem;
    font-weight: 500;
    scroll-margin-top: 100px;
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
        href: previousPageIsSearchPage ? globalThis.sessionStorage.prevPath : '/translations',
        title: "Translations",
        isCurrentPage: false,
      },
      {
        href: asPath,
        title: translation.title,
        isCurrentPage: true,
      },
    ]
    setBreadcrumbs(BREADCRUMBS_LIST)

  }, [])

  return (
    <Layout
    pageTitle={`${translation.title} | Project Nota`}
    breadcrumbsList={breadcrumbs}
  >
    <Container>
      <PageContentWrapper title={translation.title}>
      <Link href={`/authors/${translation.author.id}`} passHref>

          <StyledLink>{translation.author.name}</StyledLink>
      </Link>
      <div className='p-t-10'>
        <StyledLink href={translation.link} target='_blank' rel='noreferrer'>View PDF</StyledLink>

      </div>
      {translation.description ? (
        <>
        <StyledSecondaryHeading className='p-t-20'>Description</StyledSecondaryHeading>
        <DefaultText className='p-t-10'>{translation.description}</DefaultText>  
        </>
      ) : null }

        <StyledSecondaryHeading className='p-t-20'>Translation</StyledSecondaryHeading>
      <StyledTranslation
          className='p-t-10'
          dangerouslySetInnerHTML={
            { __html: translation.body }
          }
      />

      {translation.acknowledgement ? (
        <>
          <StyledSecondaryHeading className='p-t-20'>Acknowledgements</StyledSecondaryHeading>
          <StyledTranslation
            className='p-t-10'
            dangerouslySetInnerHTML={
              { __html: translation.acknowledgement }
            }
          />
        </>
      ) : null}

      </PageContentWrapper>
    </Container>
    </Layout>
  );
};

TranslationShow.propTypes = {
  
};

export async function getStaticPaths() {
  const translations = await fetchStrapiApi("translations");

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