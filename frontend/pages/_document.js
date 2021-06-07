import Document, { Html, Head, Main, NextScript } from "next/document";
// Required for @emotion/css
import { extractCritical } from "@emotion/server";
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react'
import { Provider, Button } from "reakit";

const Body = styled.body``
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const page = await ctx.renderPage();
    const styles = extractCritical(page.html);
    return { ...initialProps, ...page, ...styles };
  }

  


  render() {
    return (
      <Html lang="en">
         <Global
  
    styles={css`
      
  html {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
  }
  body {
    font-family: 'Nunito Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--bg);
    color: var(--text);
    -webkit-transition: background-color 1000ms linear;
    -ms-transition: background-color 1000ms linear;
    transition: background-color 1000ms linear;
  }
  * {
    margin: 0;
    padding: 0;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  
  a {
    text-decoration: none;
  }
    `}
  />
        <Head>
          <style
            data-emotion-css={this.props.ids.join(" ")}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png"/>
<link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png"/>
<link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png"/>
<link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png"/>
<link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png"/>
<link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png"/>
<link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png"/>
<link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png"/>
<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png"/>
<link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png"/>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"/>
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
<link rel="manifest" href="/manifest.json"/>
<meta name="msapplication-TileColor" content="#ffffff"/>
<meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
<meta name="theme-color" content="#ffffff"></meta>
<link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,300;1,400&display=swap" rel="stylesheet"></link>
<link href="https://fonts.googleapis.com/css2?family=Julius+Sans+One&family=Parisienne&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Tajawal:wght@300;400;500;700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;600&display=swap" rel="stylesheet" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
        </Head>
        <body>
          <Provider>
            <Main />
            <NextScript />
          </Provider>
        </body>
      </Html>
    );
  }
}