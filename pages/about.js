import Layout from '../components/Layout';
import Container from '../components/shared/Container';
import { useTranslation } from 'next-i18next'
import { Search, FeaturedResources } from '../features';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ContentLayout from "@/components/Layout/ContentLayout";

export default function Home() {
  const { t } = useTranslation('home')

  return (
    <Layout
      pageTitle='Project Nota | About'
    >

      <ContentLayout title="About">
        <p>
          Project Nota is a group dedicated to drawing
          attention to the Latin letters and works of
          famous women by focusing on the digitization of texts,
          translating these texts into English, Spanish, and
          French, and increasing their overall accessibility.
          Among us we have over 150 years of Latin experience
          including many years of teaching experience,
          seven advanced degrees, many publications
          in academic journals, and multiple
          positions in professional organizations.
          For more information visit www.lupercallegit.org/projectnota
          or email projectnotaforwomen@gmail.com
        </p>
      </ContentLayout>

    </Layout>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
  },
})