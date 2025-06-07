# Getting Started

1.  Clone the repository

        git clone https://github.com/MooseNeuro/mooseneuro.github.io.git
        cd mooseneuro.github.io

2.  Install dependencies
    Make sure you have Node.js installed.

        npm install

    This will install all required dependencies as specified in package.json. After installation, a node_modules/ directory will be created containing all dependency files.

3.  Run in development mode

        npm run dev

    This starts the Astro dev server at http://localhost:4321 in development mode with hot reload and fewer restrictions.

4.  Build and Preview (Before Commit)
    Before pushing changes, it's a good idea to test the production build:

        npm run build # Generates static output in the 'dist' folder

    Builds the static site into the dist/ directory, ready to be deployed (e.g., to GitHub Pages).

        npm run preview # Serves the static build locally

    This helps verify that routing, dynamic content, and markdown rendering all work as expected in the built version.
    This will locally serve the production build so you can test it before pushing to GitHub.

## 📁 Folder Structure

mooseneuro.github.io/

    #Astro

    ├── public/ # Public assets served as-is
    │ └── assets/ # Images and videos used across the website (logos, .bib files etc.)
    ├── src/
    │ ├── assets/ # Fixed assets (duplicated under public/assets)
    │ ├── components/ # Astro components used across pages (Navbar, Footer, Cards, etc.)
    │ ├── content/ # Markdown-based content
    │ │ ├── faq.md # Example of a single MD page
    │ │ ├── support.md # Another single MD page
    │ │ ├── blogs/ # Folder for blog content (one MD per blog)
    │ │ │ └── content.md
    │ │ └── workshops/ # Folder for workshops (one MD per event)
    | | | └── config.ts # Defines schema for workshops (frontmatter (var))
    │ │ ├── content.md
    │ │ └── config.ts # Schema for frontmatter validation
    │ ├── layouts/ # Page and content layouts
    │ ├── pages/ # Route-based .astro pages
    │ │ ├── publications.astro # Publication list with bib rendering
    │ ├── styles/ # Global styles (Tailwind, custom CSS)
    │ │ └── global.css
    │ ├── scripts/ # JS utilities (e.g., citation processing)
    │ │ └── formatCitations.js
    │ └── constants.ts # Site metadata constants
    ├── .astro/ # Astro cache (auto-generated)
    ├── .gitignore
    ├── astro.config.mjs # Astro project configuration
    ├── package.json # NPM dependencies and scripts
    ├── tsconfig.json # TypeScript config
    └── README.md # Project documentation

## 📄 Adding New Pages

Create a new .astro file under src/pages/, for example about.astro.
The route will automatically be available at https://mooseneuro.github.io/about.

    📝 Adding Content via Markdown
    Markdown files are stored in src/content/.

    Option 1: Single Markdown File
    Place files like faq.md or support.md directly in src/content.

    Option 2: Section with Multiple Entries
    For blogs, workshops, etc., create a folder like src/content/blogs/ and place a content.md file inside each entry. A config.ts file in that folder defines the frontmatter schema for that section.

## 🖼️ Images in Markdown

To use images in markdown files:
Store them in

    public/assets/your-folder-name/

Reference them in the markdown frontmatter using a relative path:

    title: My Post
    image: ../../assets/your-folder/image.png
