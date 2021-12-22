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
import {DefaultText} from '@/components/shared/Paragraph/StyledText';


const STRAPI_CLIENT = new StrapiClient();

const MeetOurTeam = props => {
  const [description, setDescription] = useState('');

  const { advisors } = props;

  useEffect(() => {
    setDescription(sanitizeHtmlString(props.description))
  }, [])
  
  return (
    <Layout pageTitle={props.title}>
      <ArticleLayout title='Advisory Board'>
        <div dangerouslySetInnerHTML={{ __html: description }} />
        <StyledUnorderedList className='p-t-30'>
          {advisors.map(advisor => (
            <li className='m-b-20' key={advisor.id}>
                                <DefaultText fontWeight='bold'>{advisor.name}</DefaultText>
                  {advisor.biography ? (
                    <StyledBiographyContainer>
                      {advisor.picture && (
                        <StyledImage alt={advisor.name} src={advisor.picture.url}/>
                      )}
                      <StyledBiography>
                        <DefaultText>
                          {advisor.biography}
                        </DefaultText>
                      </StyledBiography>
                    </StyledBiographyContainer>
                  ) : null }

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

  const res = await STRAPI_CLIENT.fetchAPI('posts/4');

  const description = parseMarkdown(res.body)
  const advisors = await STRAPI_CLIENT.fetchAPI(`advisors`);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "nav", "home"])),
      description,
      title: res.title,
      advisors
    }
  }
}

export default MeetOurTeam;


const StyledBiographyContainer = styled.div`
  display: flex;
`

const StyledBiography = styled.div`
  flex: 1;
`

const StyledImage = styled.img`
  flex: 0 0 250px; 
  width: 200px;
  height: 300px;
  object-fit: cover;
  padding-right: 10px;
`

