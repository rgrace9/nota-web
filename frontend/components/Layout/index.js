import Navbar from '../shared/Navbar';
import {MenuProvider} from '../../utils/state/Menu';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Breadcrumb from '@/components/shared/Breadcrumb'
import React from 'react';


const Layout = ({ pageTitle, children, breadcrumbsList }) => (
  <React.Fragment>
               <Head>
        <title>{pageTitle}</title>
      </Head>
 
    <Navbar />


    <Breadcrumb breadcrumbsList={breadcrumbsList} />
  

    <main>
      {children}
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