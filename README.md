# Indi Radio

Live radio & TV streaming site for Indi Radio, built as three separate apps:

```
client/   React + Vite frontend (Framer Motion animations) — hosted on Hostinger, indiradio.ca
server/   Node.js backend (Vercel serverless functions — contact form only)
studio/   Sanity Studio (the CMS admin used to manage all page/blog content)
```

## Live deployments

- **Site**: https://indiradio.ca (hosted on Hostinger, static build uploaded manually — see "Deploying the frontend" below)
- **Backend API**: https://server-dun-eta.vercel.app (Vercel) — `/api/health`, `/api/contact`
- **Admin panel (Sanity Studio)**: https://indiradio.sanity.studio — log in with the GitHub account connected to the project
- **Sanity project**: "Indi Radio", project ID `7tly58zg`, dataset `production`, org `ocx88wooa`

## How content flows

All page copy, images, the live-stream URLs, the blog, and the radio schedule are
managed dynamically in **Sanity Studio** (`studio/`), not hardcoded in the frontend.
The React app (`client/`) fetches that content at runtime via the Sanity API.
The Node backend (`server/`) only handles the contact form: it validates the
submission, writes it into Sanity as a `contactSubmission` document, and
optionally emails a notification.

```
Studio (content editors) → Sanity (hosted content API)
                                  ↑ read (public/CDN)         ↑ write (token, server-only)
                        React frontend (client/)     Node backend (server/, on Vercel)
                                                              ↑ POST /api/contact
                                                       Contact form on the site
```

## Getting started (local development)

You'll need Node.js 18+ installed locally.

### 1. Sanity Studio

```bash
cd studio
npm install
cp .env.example .env   # already points at the real project ID/dataset
npm run dev             # Studio runs at http://localhost:3333
```

Log in with `npx sanity login` if prompted. Fill in **Site Settings**, **Home Page**,
**About Page**, **Radio Page**, and **Contact Page** (each is a singleton), plus add
**Blog Post**, **Radio Show**, and **Team Member** entries as needed.

### 2. Frontend

```bash
cd client
npm install
cp .env.example .env   # already points at the real Sanity project + deployed API
npm run dev             # http://localhost:5173
```

### 3. Backend

```bash
cd server
npm install
cp .env.example .env   # set SANITY_WRITE_TOKEN (see below) — never commit this
npm run dev             # vercel dev, http://localhost:3000 by default
```

Generate a Sanity write token from https://www.sanity.io/manage → the "Indi Radio"
project → API → Tokens (role: `write`), and put it in `server/.env` as
`SANITY_WRITE_TOKEN`. This token must never be exposed to the frontend.

## Deploying the frontend (Hostinger)

The frontend is a static build — there's no server-side build step on Hostinger, so
you build locally and upload the output:

```bash
cd client
# make sure .env has the real production values (see .env.example) before building —
# unlike Vercel, a static host has no build-time env injection; whatever is baked
# into the build at `npm run build` time is what ships.
npm run build
cd dist && zip -r ../../indiradio-site.zip . && cd ../..
```

Then in Hostinger's **hPanel → Files → File Manager → public_html**:
1. Upload `indiradio-site.zip`.
2. Extract it directly into `public_html` (not a subfolder).
3. Delete the zip.
4. Confirm a `.htaccess` file exists at the `public_html` root (it's a hidden file —
   enable "show hidden files" in File Manager to check). It's required for
   client-side routing (About/Radio/Blog/Contact links) to work on refresh.

## Deploying the backend (Vercel)

```bash
cd server
vercel --prod
```

Env vars are already set on the Vercel project (`SANITY_PROJECT_ID`, `SANITY_DATASET`,
`SANITY_WRITE_TOKEN`, `ALLOWED_ORIGINS`). If `ALLOWED_ORIGINS` ever needs updating
(e.g. a new domain), redeploy afterward — env var changes don't apply to already-built
deployments.

## Deploying the Studio

```bash
cd studio
npm run deploy   # sanity deploy — hostname is pinned to "indiradio" in sanity.cli.js
```

## Stack

- React 18 + Vite, React Router, Framer Motion, Tailwind CSS
- Sanity (Studio + Content API) as the CMS
- Node.js serverless functions on Vercel for the contact form
- `hls.js` for the live TV stream, native `Audio` for the radio stream
- Static hosting on Hostinger for the built frontend
