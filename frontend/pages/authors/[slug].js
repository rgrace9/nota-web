import Layout from '../../components/Layout';
import Container from '../../components/shared/Container';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {Search, FeaturedResources} from '../../features';
import {HeroImage} from '../../components/shared/Hero'
import StrapiClient from "@/lib/StrapiClient";
import styled from "@emotion/styled";
import { device } from "@/styles/screenSizes";


const STRAPI_CLIENT = new StrapiClient();


const RelatedContentContainer = styled.aside`
  background: pink;
  flex: 1;
  flex-direction: row;
  width: 100%;
  @media ${device.mobileL} {
    flex: 0 0 12em;
  }
`

const PageWrapper = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    justify-content: space-between;
    transition: ease all .5s;
    width: 100%;
  @media ${device.mobileL} {
    flex: 1;
    flex-direction: row;
  }
`

const StyledPrimaryHeading = styled.h1`
  font-size: 28px;
  font-weight: 500;
`
const StyledSecondaryHeading = styled.h1`
  font-size: 24px;
`

const StyledText= styled.p`
  line-height: 1.5;
  font-size: 16px;
`

const StyledMainContentWrapper = styled.div`
  width: 100%;
  padding-right: 20px;
`
export default function Home(props) {

  const {author} = props;
  const BREADCRUMBS_LIST = [
    {
      href: "/",
      title: "Home",
    },
    {
      href: "/authors",
      title: "Authors",
      isCurrentPage: false,
    },
    {
      href: "/authors",
      title: author.name,
      isCurrentPage: true,
    },
  ];

  const { t } = useTranslation('home')

  return (
    <Layout
      pageTitle={`${author.name} | Project Nota`}
      breadcrumbsList={BREADCRUMBS_LIST}
    >
 

        <Container>
          <PageWrapper>
            <StyledMainContentWrapper>
              <section>
              <StyledPrimaryHeading>{author.name}</StyledPrimaryHeading>
                <p>{author.timePeriod && author.timePeriod.name}</p>
                <p>{author.location && author.location.name}</p>
              </section>
             


              <section>
                <StyledSecondaryHeading>Biography</StyledSecondaryHeading>
              <StyledText>{author.biography}</StyledText>
              </section>
              <section>
                <StyledSecondaryHeading>Lesson Plans</StyledSecondaryHeading>
              {/* <StyledText>{author.biography}</StyledText> */}
              </section>
              <section>
                <StyledSecondaryHeading>Transcriptions</StyledSecondaryHeading>
              {/* <StyledText>{author.biography}</StyledText> */}
              </section>
              
            </StyledMainContentWrapper>
          <RelatedContentContainer>
            <StyledSecondaryHeading>Related Authors</StyledSecondaryHeading>
          </RelatedContentContainer>

          </PageWrapper>
        </Container>
    </Layout>
  );
};

export async function getStaticPaths() {
  const authors = await STRAPI_CLIENT.fetchAPI("authors");

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
  const author = await STRAPI_CLIENT.fetchAPI(`authors/${params.slug}`);

  return {
    props: {
      ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
      author
    }
}}