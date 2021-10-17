import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { fetchStrapiApi } from "@/lib/StrapiClient";

const Department = props => {
  const {department} = props;

  return (
    <div>
      
    </div>
  );
};

Department.propTypes = {
  
};

export default Department;

export const getStaticPaths = async () => {
  const departments = await fetchStrapiApi(`departments`);


  const paths = departments.map((department) => ({
    params: { slug: department.id.toString() },
  }))

  return { paths, fallback: false }
}

export const getStaticProps = async ({ locale, params }) => {
  const department = await fetchStrapiApi(`departments/${params.slug}`);

  try {
  

    return {
      props: {
        ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
        department,
        
      }
    }

  } catch (err) {
    return {
      props: {
        department,
      }
    }
  }
}