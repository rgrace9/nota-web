import DOMPurify from 'dompurify';
import marked from "marked";


export const sanitizeHtmlString = (htmlString) => {
  const clean = DOMPurify.sanitize( htmlString );
  return clean;
}

export const parseMarkdown = (markdown) => {
  const htmlString = marked(markdown);
  return htmlString;
}