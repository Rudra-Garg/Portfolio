# Rudra Garg | Portfolio

**Backend Engineering · Distributed Systems · Applied AI**

My personal portfolio, bringing together backend development at GRIG Technologies, multiplayer applications, and research in edge computing and local AI.

[Visit the portfolio](https://rudragarg.dev) · [Engineering](https://rudragarg.dev/engineering) · [Research](https://rudragarg.dev/research) · [About & Experience](https://rudragarg.dev/about) · [Resume](https://rudragarg.dev/resume)

## What's inside

- **Experience first:** GRIG internship work on notification workflows, inventory APIs, authentication, and Kubernetes infrastructure.
- **Engineering case studies:** alert.ventory, TerraQuest, Portal Gambit, and the earlier Pilgrim AI project.
- **Research:** LOKI's local NLP pipeline, MUCEDS UAV simulations, and a fog computing testbed, with architecture diagrams and technical reports.
- **Presentation:** light and dark themes, responsive layouts, animated network visuals, recorded demos, and an embedded PDF viewer.

Game demos are recorded; their live backends are offline. Research metrics describe their respective model evaluations or simulation studies, not production-wide guarantees.

## Built with

| Layer | Technologies |
| --- | --- |
| Application | Next.js 16 App Router, React 19, TypeScript |
| Styling | Tailwind CSS 4, locally bundled Fontsource fonts |
| Interaction | Framer Motion, next-themes, Lucide icons |
| Technical content | Mermaid diagrams, PDF viewer, recorded GIF demos |
| Hosting | Cloudflare Pages with GitHub integration |

The Python, Go, FastAPI, Temporal, and Kubernetes systems described on the site are portfolio projects, not dependencies of this frontend.

## Local development

Use a Node.js version supported by Next.js 16, such as Node.js 22 LTS, and npm.

```bash
git clone https://github.com/Rudra-Garg/Portfolio.git
cd Portfolio
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000).

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Compile, check TypeScript, and generate the static export |
| `npm run lint` | Run ESLint |

The site uses `output: 'export'` in `next.config.ts` and writes the deployable site to `out/`. Use a static file server to inspect that output; `next start` is not the production serving flow for this export.

## Where to make changes

| Path | Responsibility |
| --- | --- |
| `app/page.tsx` | Homepage section order |
| `components/sections/Hero.tsx` | Introduction and primary actions |
| `components/sections/CareerHighlights.tsx` | Experience, featured projects, and research summaries |
| `components/layout/Navigation.tsx` | Navigation, footer, and contact links |
| `app/engineering/page.tsx` | Engineering project data and diagrams |
| `app/research/page.tsx` | Research descriptions, metrics, and report links |
| `app/about/page.tsx` | Education, experience timeline, and skills |
| `app/layout.tsx` | Site metadata and theme provider |
| `app/globals.css` | Shared styling and fonts |
| `app/resume/route.ts` | Google Drive resume retrieval |
| `public/demos/` | Recorded project demos |
| `public/reports/` | Research PDFs |

Page-specific presentation components live alongside their route in `components.tsx`. Content is maintained in source files rather than a CMS.

## Resume and deployment

The resume route fetches a PDF from Google Drive using the file ID in `app/resume/route.ts`. It requires public download access and network access during the build. With static export, treat the deployed resume as a build-time snapshot: rebuild after replacing the source PDF. The separate `public/resume.pdf` asset is not the source used by that route.

Cloudflare Pages is connected to this repository. The static build command is `npm run build`, with `out` as the output directory. Check the Cloudflare Pages commit check after pushing to `main`; a successful local build does not by itself confirm deployment.

## Content maintenance

- Keep homepage summaries, case studies, and the About page consistent with the latest resume and supporting project evidence.
- Identify each result as an internship outcome, model evaluation, or simulation result.
- Include measurement scope and baseline when available. Do not invent dataset splits, load-test conditions, or production guarantees.
- Keep private employer code, credentials, and internal deployment details out of public case studies.
- Check project anchors, source links, reports, and resume access after changing content.
- Preserve the existing light/dark design and readable mobile navigation.

## Contact

[Rudra Garg on GitHub](https://github.com/Rudra-Garg) · [LinkedIn](https://www.linkedin.com/in/rudra-garg/) · [Email](mailto:rudragarg09006@gmail.com)
