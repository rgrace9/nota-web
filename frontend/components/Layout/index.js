import Navbar from '../shared/Navbar';
import {MenuProvider} from '../../utils/state/Menu';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Breadcrumb from '@/components/shared/Breadcrumb'
import React from 'react';


const Layout = ({ pageTitle, children }) => (
  <React.Fragment>
               <Head>
        <title>{pageTitle}</title>
      </Head>
 
    <Navbar />


    <Breadcrumb />
  

    <main>
      {children}
    </main>
  </React.Fragment>
)

Layout.propTypes = {
  pageTitle: PropTypes.string
}
Layout.defaultProps = {
  pageTitle: 'Project Nota'
}
export default Layout;