import React from 'react';
import PropTypes from 'prop-types';
import Select from '@/components/shared/dataEntry/Select';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

const LanguageSelector = props => {

  const router = useRouter();

  const onLanguageChange = (selectedLocale) => {
    if (router.locales.includes(selectedLocale)) {
      router.push(router.pathname, router.pathname, { locale: selectedLocale })
    }
  }
  return (
  
    <StyledContainer>
      <Select 
        labelFor='language'
        labelTitle='Language'
        // isScreenReaderOnly
        onChange={onLanguageChange}
        defaultValue={router.locale}
      />
    </StyledContainer>
   
  );
};

LanguageSelector.propTypes = {
  
};

export default LanguageSelector;

const StyledContainer = styled.span`
  background: transparent;
  display: flex;
  align-items: center;
  svg {
    margin-right: 4px;
  }
`