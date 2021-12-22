import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import StrapiClient from "@/lib/StrapiClient";
import { parseMarkdown, sanitizeHtmlString } from "@/utils/parseText";
import Layout from "@/components/Layout";
import ArticleLayout from "@/components/Layout/ArticleLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";


const STRAPI_CLIENT = new StrapiClient();

const MissionStatement = props => {
  const [description, setDescription] = useState('')
  useEffect(() => {
    setDescription(sanitizeHtmlString(props.description))
  }, [])
  return (
    <Layout pageTitle={props.title}>
      <ArticleLayout title={props.title}>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </ArticleLayout>
    </Layout>
  );
};

MissionStatement.propTypes = {
  
};

export const getStaticProps = async (props) => {
  const { locale } = props;

  const res = await STRAPI_CLIENT.fetchAPI('posts/5');

  const description = parseMarkdown(res.body)

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "nav", "home"])),
      description,
      title: res.title
    }
  }
}

export default MissionStatement;