import Navbar from '../shared/Navbar';
import {MenuProvider} from '../../utils/state/Menu';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Breadcrumb from '@/components/shared/Breadcrumb'
import React from 'react';
import {LoadingPage} from 'components/shared/Loading';

const Layout = ({ pageTitle, children, breadcrumbsList, loading }) => (
  <React.Fragment>
               <Head>
        <title>{pageTitle}</title>
      </Head>
 
    <Navbar />


    <Breadcrumb breadcrumbsList={breadcrumbsList} />
  

    <main>
      {loading ? (
        <LoadingPage />
      ) : (
        children
      )}
    </main>
  </React.Fragment>
)

Layout.propTypes = {
  pageTitle: PropTypes.string,
  breadcrumbsList: PropTypes.array,
}
Layout.defaultProps = {
  pageTitle: 'Project Nota',
  breadcrumbsList: []
}
export default Layout;