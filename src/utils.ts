export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(undefined, options);
}

import fs from "fs";
import path from "path";
import { parse } from "bibtex-parse";
import CSL from "citeproc";

export function formatCitations() {
  const bibtex = fs.readFileSync("./public/assets/publications.bib", "utf-8");
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA");
  console.log(bibtex);
  const citations = parse(bibtex); // parse into CSL-JSON
  console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBB");
  console.log(citations);
  const style = fs.readFileSync("./public/csl/apa-cv.csl", "utf-8");

  const locale = fs.readFileSync("./public/csl/locales-en-US.xml", "utf-8");
  console.log("#########################", typeof locale);
  const sys = {
    retrieveLocale: (lang) => locale,
    retrieveItem: (id) => citations.find((item) => item.id === id),
  };

  const citeproc = new CSL.Engine(sys, style);
  citeproc.updateItems(citations.map((item) => item.id));

  const [meta, entries] = citeproc.makeBibliography();

  return citations.map((item, i) => ({
    id: item.id,
    citation: entries[i],
  }));
}
