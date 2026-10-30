# Muhammad Hamza Siddiqui — Portfolio & Pipeline Rescue

A cloud/data/AI engineering portfolio with About, Skills, Projects, architecture walkthroughs and an optional interactive Pipeline Rescue lab.

**Live on AWS Amplify:** https://main.d3u70dksq1w00b.amplifyapp.com

**Public source:** https://github.com/Muhammad-Hamza69/hamza-pipeline-rescue-aws

The lab transforms sample events in the browser. Visitors repair duplicates, quarantine incomplete data and reorder late events to unlock stories grounded in the existing biography. It is a simulation, not an AWS processing backend.

## Run locally

```powershell
npm ci
npm run dev
```

The normal Next.js app retains Sanity, Studio and the revalidation endpoint. See `.env.local.example` for optional CMS configuration. Private tokens stay outside source control.

## AWS build

```powershell
npm run test:feature
npm run build:amplify
node scripts/preview-amplify.mjs
```

In another terminal, run `node scripts/verify-portfolio.mjs` for desktop/mobile, navigation, keyboard and feature checks plus screenshots. Feature tests need Node.js 22.18+.

The AWS artifact is `.amplify-build/out`. A generated static entry reuses the existing page while preserving the normal app's server features in source. The AWS page is a snapshot; CMS updates require a new deployment.

- [AWS deployment](docs/DEPLOYMENT.md)
- [Requirements audit and eligibility gaps](docs/REQUIREMENTS-AUDIT.md)
- [Builder Center submission draft](docs/SUBMISSION-DRAFT.md)

The draft is not a submitted entry. Earlier Vercel deployment history raises an unresolved question about the prior-publication rule. Resolve it with the organizer before claiming eligibility.

## Stack

Next.js 16.2.9, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Sanity and AWS Amplify Hosting. Inter is bundled under the [SIL Open Font License](public/fonts/OFL.txt).
