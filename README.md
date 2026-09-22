# Indi Radio

Live radio & TV streaming site for Indi Radio, built as three separate apps:

```
client/   React + Vite frontend (Framer Motion animations, deployed to indiradio.ca)
server/   Node.js backend (Vercel serverless functions — contact form, etc.)
studio/   Sanity Studio (the CMS admin used to manage all page/blog content)
```

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

## Getting started

You'll need Node.js 18+ installed locally (this scaffold was created without it
available on this machine, so nothing has been `npm install`ed or run yet).

### 1. Create a Sanity project

```bash
cd studio
npm install
npx sanity login
npx sanity init   # choose "create new project", note the Project ID
```

Copy `.env.example` to `.env` and fill in the project ID/dataset, then:

```bash
npm run dev   # Studio runs at http://localhost:3333
```

Open the Studio and fill in **Site Settings**, **Home Page**, **About Page**,
**Radio Page**, and **Contact Page** (each is a singleton), plus add some
**Blog Post**, **Radio Show**, and **Team Member** entries.

### 2. Run the frontend

```bash
cd client
npm install
cp .env.example .env   # set VITE_SANITY_PROJECT_ID / VITE_SANITY_DATASET
npm run dev            # http://localhost:5173
```

### 3. Run the backend

```bash
cd server
npm install
cp .env.example .env   # set SANITY_PROJECT_ID/DATASET + a write token
npm run dev            # vercel dev, http://localhost:3000 by default
```

Generate a Sanity write token from https://www.sanity.io/manage → your project →
API → Tokens (Editor permission), and put it in `server/.env` as
`SANITY_WRITE_TOKEN`. This token must never be exposed to the frontend.

## Deployment

- **`client/`** → deploy as its own Vercel project, connect the custom domain
  `indiradio.ca`. Set the `VITE_*` env vars from `client/.env.example` in the
  Vercel project settings.
- **`server/`** → deploy as a separate Vercel project (e.g. `api.indiradio.ca`
  or the default `*.vercel.app` URL). Set `VITE_API_BASE_URL` in the client
  project to point at it, and set `ALLOWED_ORIGINS` in the server project to
  include `https://indiradio.ca`.
- **`studio/`** → deploy with `npx sanity deploy` (hosted free at
  `https://your-studio-name.sanity.studio`), or embed it as a route in the
  frontend later if you'd prefer editors to log in from indiradio.ca itself.

## Stack

- React 18 + Vite, React Router, Framer Motion, Tailwind CSS
- Sanity (Studio + Content API) as the CMS
- Node.js serverless functions on Vercel for the contact form
- `hls.js` for the live TV stream, native `Audio` for the radio stream
