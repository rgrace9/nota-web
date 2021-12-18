import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import StyledLink from '@/components/shared/Link/StyledLink'
import StrapiClient from "@/lib/StrapiClient";
import { parseMarkdown, sanitizeHtmlString } from "@/utils/parseText";
import Layout from "@/components/Layout";
import ArticleLayout from "@/components/Layout/ArticleLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styled from "@emotion/styled";
import  {StyledUnorderedList} from '@/components/shared/List';


const STRAPI_CLIENT = new StrapiClient();

const MeetOurTeam = props => {
  const [description, setDescription] = useState('');

  const { departments } = props;

  useEffect(() => {
    setDescription(sanitizeHtmlString(props.description))
  }, [])
  
  return (
    <Layout pageTitle={props.title}>
      <ArticleLayout title={props.title}>
        <div dangerouslySetInnerHTML={{ __html: description }} />
        <h2>Departments</h2>
        <StyledUnorderedList className='p-b-30'>
          {departments.map(department => (
            <li className='m-b-20' key={department.id}>
              <Link href={`/about/meet-our-team/${department.id}`} passHref>
                <StyledLink>
                  {department.name}
                </StyledLink>
              </Link>
              <p>{department.description}</p>

            </li>
          ))}
        </StyledUnorderedList>
      </ArticleLayout>

    </Layout>
  );
};

MeetOurTeam.propTypes = {
  
};

export const getStaticProps = async (props) => {
  const { locale } = props;

  const res = await STRAPI_CLIENT.fetchAPI('posts/2');

  const description = parseMarkdown(res.body)
  const departments = await STRAPI_CLIENT.fetchAPI(`departments`);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "nav", "home"])),
      description,
      title: res.title,
      departments
    }
  }
}

export default MeetOurTeam;