import Navbar from '../shared/Navbar';
import { MenuProvider } from '../../utils/state/Menu';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Breadcrumb from '@/components/shared/Breadcrumb'
import React from 'react';
import { LoadingPage } from 'components/shared/Loading';
import Footer from 'components/shared/Footer';
import styled from '@emotion/styled';

const StyledContainer = styled.div`
  position: relative;
    min-height: 100vh;
`
const StyledMain = styled.main`
  padding-bottom: 100px;
`


const Layout = ({ pageTitle, children, breadcrumbsList, loading }) => (
  <StyledContainer>
    <Head>
      <title>{pageTitle}</title>
    </Head>

    <Navbar />


    <Breadcrumb breadcrumbsList={breadcrumbsList} />


    <StyledMain>
      {loading ? (
        <LoadingPage />
      ) : (
        children
      )}
    </StyledMain>

    <Footer />
  </StyledContainer>
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