export const SITE_TITLE = "MOOSE";
export const SITE_URL = "/";

export const seoData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MOOSE Neuro",
    "url": "https://mooseneuro.github.io/",
    "description": "MOOSE is an open-source neuroscience simulator for modeling brain systems at multiple scales, including ion channels, cells, and networks.",
    "inLanguage": "en",
    "creator": {
      "@type": "Organization",
      "name": "Bhalla Lab, NCBS",
      "url": "https://www.ncbs.res.in/faculty/bhalla"
    },
    "publisher": {
      "@type": "Organization",
      "name": "National Centre for Biological Sciences",
      "url": "https://www.ncbs.res.in"
    },
    "sameAs": [
      "https://moose.ncbs.res.in",
      "https://github.com/BhallaLab/moose",
      "https://www.ncbs.res.in/faculty/bhalla"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MOOSE",
    "url": "https://github.com/BhallaLab/moose",
    "applicationCategory": "ScientificApplication",
    "operatingSystem": "Linux, macOS, Windows",
    "programmingLanguage": "C++, Python",
    "softwareVersion": "3.1",
    "license": "https://opensource.org/licenses/GPL-3.0",
    "description": "MOOSE is an open-source multiscale neuroscience simulation environment for computational modeling of neural systems and biophysical processes.",
    "creator": {
      "@type": "Organization",
      "name": "Bhalla Lab, NCBS",
      "url": "https://www.ncbs.res.in/faculty/bhalla"
    }
  }
];

export const funders = [
  { name: "NCBS", src: "src/assets/funders/NCBS-Logo.jpg" },
  { name: "DBT", src: "src/assets/funders/DBT-logo.png" },
  { name: "DAE", src: "src/assets/funders/DAE.png" },
  {
    name: "Kalvi",
    src: "src/assets/funders/The_Kavli_Foundation_Logo_Blue_Red.png",
  },
  { name: "TIFR ", src: "src/assets/funders/tifr-logo.png" },
];
