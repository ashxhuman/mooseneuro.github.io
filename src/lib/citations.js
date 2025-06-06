import fs from "fs";
import Cite from "citation-js";

function convertDOIsToLinks(html) {
  return html.replace(
    /\b(10\.\d{4,9}\/[-._;()/:A-Z0-9]+)\b/gi,
    '<a href="https://doi.org/$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );
}

export function getCitations() {
  const bibtex = fs.readFileSync("./public/assets/publications.bib", "utf-8");
  const cite = new Cite(bibtex);

  const rawHtml = cite.format("bibliography", {
    format: "text",
    template: "apa",
    lang: "en-US",
  });

  const htmlWithLinks = convertDOIsToLinks(rawHtml);

  const citations = htmlWithLinks
    .split("\n")
    .filter((line) => line.trim().length > 0);

  return citations;
}
