import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { fetchStrapiApi } from "@/lib/StrapiClient";
import styled from "@emotion/styled";
import Layout from '@/components/Layout';
import Container from '@/components/shared/Container';
import { useEffect, useState } from 'react';
import StyledLink from '@/components/shared/Link/StyledLink'
import { withRouter } from 'next/router'
import PageContainer from '@/components/shared/Container/PageContentWrapper';
import {DefaultText} from '@/components/shared/Paragraph/StyledText';
import PageContentWrapper from '@/components/shared/Container/PageContentWrapper';
import { StyledUnorderedList } from '@/components/shared/List';


const Department = props => {
  const { department, router } = props;
  const { asPath } = router;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  
  useEffect(() => {
  
    const BREADCRUMBS_LIST = [
      {
        href: "/",
        title: "Home",
      },
      {
        href: '/about/meet-our-team',
        title: "Meet Our Team",
        isCurrentPage: false,
      },
      {
        href: asPath,
        title: department.name,
        isCurrentPage: true,
      },
    ]
    setBreadcrumbs(BREADCRUMBS_LIST)

  }, [])


  return (
    <Layout
    pageTitle={`${department.name} | Project Nota`}
    breadcrumbsList={breadcrumbs}
  >
    <Container>
      <PageContentWrapper title={department.name}>

      {department.description ? (
        <>
                  <StyledSecondaryHeading className='p-t-20'>Objective</StyledSecondaryHeading>
        <DefaultText className='p-t-10'>{department.description}</DefaultText>
        </>

      ) : null}
      {department.team_members.length ? (
        <>
          <StyledSecondaryHeading className='p-t-20'>Team Members</StyledSecondaryHeading>
          <StyledUnorderedList>
            {department.team_members.map(member => (
                <li className='p-b-30' key={member.id}>
                  <DefaultText fontWeight='bold'>{member.name}</DefaultText>
                  {member.biography ? (
                    <StyledBiographyContainer>
                      {member.picture && (
                        <StyledImage alt={member.name} src={member.picture.url}/>
                      )}
                      <StyledBiography>
                        <DefaultText>
                          {member.biography}
                        </DefaultText>
                      </StyledBiography>
                    </StyledBiographyContainer>
                  ) : null }
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

Department.propTypes = {
  
};

export default withRouter(Department);

export const getStaticPaths = async () => {
  const departments = await fetchStrapiApi(`departments`);

  const paths = departments.map((department) => ({
    params: { slug: department.id.toString() },
  }))

  return { paths, fallback: false }
}

export const getStaticProps = async ({ locale, params }) => {
  const department = await fetchStrapiApi(`departments/${params.slug}`);

  try {
  

    return {
      props: {
        ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
        department,
        
      }
    }

  } catch (err) {
    return {
      props: {
        department,
      }
    }
  }
}

const StyledSecondaryHeading = styled.h2`
font-size: 4rem;
font-weight: 500;
scroll-margin-top: 100px;
`

const StyledBiographyContainer = styled.div`
  display: flex;
`

const StyledBiography = styled.div`
  flex: 1;
`

const StyledImage = styled.img`
  flex: 0 0 250px; 
  width: 200px;
  height: 300px;
  object-fit: cover;
  padding-right: 10px;
`

