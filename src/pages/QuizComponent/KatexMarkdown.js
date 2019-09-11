import React from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

function convertToLatex(text) {
  let REGEX = /\$(.*?)\$/g;
  let matched = text.match(REGEX);
  let html = text;
  if (Boolean(matched)) {
    matched.forEach(found => {
      let str = found.replace(/\$/g, "");
      html = html.replace(found, katex.renderToString(str));
    });
  }
  return html;
}
export const KatexMarkdown = ({ text, render }) => {
  let html = convertToLatex(text || "");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
