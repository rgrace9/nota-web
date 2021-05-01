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
  flex: 0 0 12em;
  background: pink;
`

const PageWrapper = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    justify-content: space-between;
    transition: ease all .5s;
  @media ${device.tablet} {
    flex: 1;
    flex-direction: row;
  }
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

  console.log(props)
  return (
    <Layout
      pageTitle={`${author.name} | Project Nota`}
      breadcrumbsList={BREADCRUMBS_LIST}
    >
 

        <Container>
          <PageWrapper>
            <div>
              <h1>{author.name}</h1>

            </div>
          <RelatedContentContainer>
            <h3>Related Resource</h3>
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