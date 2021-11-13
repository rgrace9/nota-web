import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { fetchStrapiApi } from "@/lib/StrapiClient";
import styled from "@emotion/styled";
import Layout from '@/components/Layout';
import Container from '@/components/shared/Container';
import { useEffect, useState } from 'react';
import { withRouter } from 'next/router'
import PageContainer from '@/components/shared/Container/PageContentWrapper'
const LessonPlan = props => {
  const { lessonPlan, router } = props;
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
        href: previousPageIsSearchPage ? globalThis.sessionStorage.prevPath : '/lesson-plans',
        title: "Lesson Plans",
        isCurrentPage: false,
      },
      {
        href: asPath,
        title: lessonPlan.title,
        isCurrentPage: true,
      },
    ]
    setBreadcrumbs(BREADCRUMBS_LIST)

  }, [])

  return (
    <Layout
    pageTitle={`${lessonPlan.title} | Project Nota`}
    breadcrumbsList={breadcrumbs}
  >


    <Container>
      <PageContainer title={lessonPlan.title}>
        <section>
          <p>{lessonPlan.description}</p>
        </section>
      </PageContainer>
    </Container>
    </Layout>
  );
};

export async function getStaticPaths() {
  const lessonPlans = await fetchStrapiApi("lesson-plans");

  const paths = lessonPlans.map((lessonPlan) => {
    return {
      params: {
        slug: lessonPlan.id.toString(),
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
    const lessonPlan = await fetchStrapiApi(`lesson-plans/${params.slug}`);

    return {
      props: {
        ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
        lessonPlan,
      }
    }

  } catch (err) {
    return {
      props: {
        ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
      }
    }
  }
}

LessonPlan.propTypes = {
  lessonPlan: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  })
};

export default withRouter(LessonPlan);