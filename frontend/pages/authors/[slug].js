import Layout from '../../components/Layout';
import Container from '../../components/shared/Container';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {Search, FeaturedResources} from '../../features';
import {HeroImage} from '../../components/shared/Hero'
import StrapiClient from "@/lib/StrapiClient";

const STRAPI_CLIENT = new StrapiClient();

const TEST_BREADCRUMBS = [
  {
    href: '/resources',
    breadcrumb: 'Resources'
  }
]
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
          <h1>{author.name}</h1>

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