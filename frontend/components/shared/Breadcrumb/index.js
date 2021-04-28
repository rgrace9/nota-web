import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from '@emotion/styled';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react"
import PropTypes from 'prop-types';


const BreadcrumbContainer = styled(Breadcrumb)`
  padding: 5px 20px;
`


const Breadcrumbs = (props) => {
  const router = useRouter();

  const {breadcrumbsList} = props;

  if (!breadcrumbsList) {
    return null;
  }

  return (
    <BreadcrumbContainer>
      {breadcrumbsList.map(b => (
        <BreadcrumbItem>
        <Link href={b.href} isCurrentPage={Boolean(b.isCurrentPage)}>
                      <a>
                        {b.title}
                      </a>
                    </Link>
        </BreadcrumbItem>
      ))}
    </BreadcrumbContainer>
  )

};

export default Breadcrumbs;

Breadcrumbs.propTypes = {
  breadcrumbsList: PropTypes.array
}
Breadcrumbs.defaultProps = {
  breadcrumbsList: []
}
const StyledListItem = styled.li`
    &:not(:first-of-type) {
    &::before {
      display: inline-block;
      margin: 0 1em;
      transform: rotate(15deg);
      border-right: 0.1em solid currentColor;
      height: 0.8em;
      content: '';
  }
}
&:hover {
  text-decoration: underline;
}
a {
  padding: 2px 5px;
  &:focus {
  outline: 1px solid currentColor;
}
}

&:only-child {
  &::before {
      display: none;
  }
}
`

const StyledContainer = styled.nav`
    position: absolute;
    top: 100px;
    left: 0;
    width: 100%;
    padding: 4px 60px;
    z-index: 1;
  .breadcrumb {
    /* display: flex;
    flex-direction: row; */
    color: black;
  }
  & [aria-current="page"] {
  color: #000;
  font-weight: 700;
  text-decoration: none;
}
  ol {
  display: inline-flex;
  font-size: initial;
  list-style: none;

  }
}

li {
  /* margin-right: 20px; */


/* .breadcrumb ol > li a:not([href]) {
  font-weight: bold;
} */

`