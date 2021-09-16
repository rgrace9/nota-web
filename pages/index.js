import Layout from '../components/Layout';
import Container from '../components/shared/Container';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import StrapiClient from "@/lib/StrapiClient";
import {Search, FeaturedResources} from '../features';
import Head from 'next/head';
import {HeroImage} from '../components/shared/Hero'

const STRAPI_CLIENT = new StrapiClient();

export default function Home(props) {

  const { t } = useTranslation('home')
  const {featuredResources} = props;

  console.log('featuredResources', featuredResources)
  return (
    <Layout>
            <Head>
        <title>Project Nota | Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HeroImage
        heroTitle='Project Nota'
        heroSubtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        linkTitle='Learn More'
        href='/about'
      />

        <Container bgColor='#B67C58'>
        <FeaturedResources resources={featuredResources} />

        </Container>
    </Layout>
  );
};

export const getStaticProps = async ({ locale }) => {
  const featuredResources = await STRAPI_CLIENT.fetchAPI("featured-resources");

  return {
    props: {
      ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
      featuredResources
    }
  }
}