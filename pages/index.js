import Layout from '../components/Layout';
import Container from '../components/shared/Container';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import StrapiClient from "@/lib/StrapiClient";
import {Search, FeaturedResources} from '../features';
import Head from 'next/head';
import {HeroImage} from '../components/shared/Hero'
import Homepage from '@/features/Homepage';
import image from 'next/image';

const STRAPI_CLIENT = new StrapiClient();

export default function Home(props) {

  const { t } = useTranslation('home')
  const {
    featuredResources,
    homePage
  } = props;

  return (
    <Layout
      showBreadcrumbs={false}
    >
      <Head>
        <title>Project Nota | Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HeroImage
        heroTitle={homePage.title}
        heroSubtitle={homePage.description}
        linkTitle='Learn More'
        href='/about/mission-statement'
        imageUrl={homePage?.image.url}
      />

        <Container bgColor='white'>
        <FeaturedResources resources={featuredResources} />

        </Container>
    </Layout>
  );
};

export const getStaticProps = async ({ locale }) => {
  const featuredResources = await STRAPI_CLIENT.fetchAPI("featured-resources");
  const homePage = await STRAPI_CLIENT.fetchAPI("home");

  return {
    props: {
      ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
      featuredResources,
      homePage
    }
  }
}