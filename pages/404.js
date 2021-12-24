import PageContentWrapper from '@/components/shared/Container/PageContentWrapper';
import styled from "@emotion/styled";
import Layout from '@/components/Layout';
import Container from '@/components/shared/Container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Link from 'next/link';
import StyledLink from '@/components/shared/Link/StyledLink'

const StyledImage = styled.img`
  height: 500px;
`

const StyledImageWrapper = styled.figure`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const StyledCaption = styled.figcaption`
  font-size: 2rem;
`

export default function Custom404() {
  return (
    <Layout
    pageTitle='Project Nota'
  >
    <Container>
      <PageContentWrapper title='Sorry! The page you are looking for cannot be found.'>
        <StyledImageWrapper>
          <StyledImage alt='Bouquet of wilting roses.' src='/images/annie-spratt-1msci6gS694-unsplash.jpg'/>
          <StyledCaption>Photo by <StyledLink fontSize='2rem' href='https://unsplash.com/@anniespratt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Annie Spratt</StyledLink> on <StyledLink fontSize='2rem' href='https://unsplash.com/s/photos/wilting-flower?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Unsplash</StyledLink></StyledCaption>
        </StyledImageWrapper>
      
      {/* <Link href='/'>
      <a>Go Home </a>
      </Link>
      <Link href='/about/contact-us'>
      <a>Contact Us </a>
      </Link> */}

        </PageContentWrapper>
    </Container>

    </Layout>

  )
}

export const getStaticProps = async ({ locale, params }) => {
  try {

    return {
      props: {
        ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
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