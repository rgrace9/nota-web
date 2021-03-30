import Layout from '../../components/Layout';
import Container from '../../components/shared/Container';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {Search, FeaturedResources} from '../../features';
import {HeroImage} from '../../components/shared/Hero'


const TEST_BREADCRUMBS = [
  {
    href: '/resources',
    breadcrumb: 'Resources'
  }
]
export default function Home() {

  const { t } = useTranslation('home')

  return (
    <Layout
      pageTitle='Project Nota | Resources'
    >
 

        <Container>
   

        </Container>
    </Layout>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
  },
})