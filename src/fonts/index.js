import { injectGlobal } from "styled-components";
import { font_face, font_family, resetStyling } from "../siteStyle";
export const BASE_PATH = "";
export const ActualCSS = `
${font_face}
 /*! normalize.css v3.0.2 | MIT License | git.io/normalize */
  
  html,input,button,*{
    font-family: ${font_family};
    font-smoothing: antialiased;
    -webkit-font-smoothing: antialiased;
  }
  button{
    // height: 75px;
  }
  p{
    ${resetStyling.p}
  }
  h1,h2,h3,h4,h5{
    ${resetStyling.h2}
  }
  body {
    margin: 0;
    background-color: #FBF9FB;
  }
  #style-1::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }
  
  #style-1::-webkit-scrollbar
  {
    width: 6px;
    background-color: #F5F5F5;
  }
  
  #style-1::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #C9CACD;
  }
  .sticky {
    position: -webkit-sticky;
    position: sticky;
  }
  
  .sticky.sticky-fixed.is-sticky {
    margin-top: 0;
    margin-bottom: 0;
    position: fixed;
    -webkit-backface-visibility: hidden;
            -moz-backface-visibility: hidden;
         backface-visibility: hidden;
  }
  
  .sticky.sticky-fixed.is-sticky:not([style*="margin-top"]) {
    margin-top: 0 !important;
  }
  .sticky.sticky-fixed.is-sticky:not([style*="margin-bottom"]) {
    margin-bottom: 0 !important;
  }
  
  
  .sticky.sticky-fixed.is-absolute{
    position: absolute;
  }
`;
export default injectGlobal`
${ActualCSS}
`;
