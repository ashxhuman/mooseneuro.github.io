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

  // Sort by year in descending order (newest first)
  const sortedData = cite.data.sort((a, b) => {
    const yearA = parseInt(a.year) || 0;
    const yearB = parseInt(b.year) || 0;
    return yearB - yearA;
  });

  const citations = sortedData.map((item) => {
    const citation = new Cite(item).format("bibliography", {
      format: "html",
      template: "apa",
      lang: "en-US",
    });

    const cleanCitation = citation.replace(/^<div[^>]*>|<\/div>$/g, "");

    return convertDOIsToLinks(cleanCitation);
  });

  return citations;
}
