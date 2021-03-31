import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from '@emotion/styled';

const convertBreadcrumb = string => {
  return string
    .replace(/-/g, ' ')
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü')
    .toUpperCase();
};

const Breadcrumbs = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState(null);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <StyledContainer aria-label="breadcrumbs">
      <ol className="breadcrumb">
        <StyledListItem>
          
        <Link href="/">
          <a style={{color: 'black'}} >HOME</a>
        </Link>
        </StyledListItem>
        {breadcrumbs.map((breadcrumb, i) => {
          return (
            <StyledListItem key={breadcrumb.href}>
              <Link href={breadcrumb.href}>
                <a aria-current="page">
                  {convertBreadcrumb(breadcrumb.breadcrumb)}
                </a>
              </Link>
            </StyledListItem>
          );
        })}
      </ol>
    </StyledContainer>
  );
};

export default Breadcrumbs;

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