import Layout from '../components/Layout';
import Container from '../components/shared/Container';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {Search, FeaturedResources} from '../features';
import Head from 'next/head';
import {HeroImage} from '../components/shared/Hero'
export default function Home() {

  const { t } = useTranslation('home')

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
        <Container>
          
        <Search />
        </Container>
        <Container bgColor='#B67C58'>
        <FeaturedResources />

        </Container>
    </Layout>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
  },
})