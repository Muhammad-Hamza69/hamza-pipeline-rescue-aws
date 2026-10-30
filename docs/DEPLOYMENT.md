# AWS Amplify deployment

Region: `us-east-1`. Mode: manual static hosting (`WEB`). App: `hamza-pipeline-rescue`. Branch: `main`.

Live URL: **https://main.d3u70dksq1w00b.amplifyapp.com**

Verified publicly without authentication on 30 October 2026. App ID `d3u70dksq1w00b`, production branch `main`, deployment job `2`, AWS status `SUCCEED`. App and branch basic authentication are both disabled.

The deployed page passed the full desktop/mobile, keyboard, navigation and creative-feature browser checks, including CSS/JavaScript asset loading and zero runtime errors. Results: [browser verification](browser-verification.json). Actual sanitized AWS responses: [deployment evidence](aws-deployment.json).

## Build and verify

```powershell
npm ci
npm run test:feature
npx tsc --noEmit
npm run build:amplify
node scripts/preview-amplify.mjs
```

In another terminal run `node scripts/verify-portfolio.mjs`. Use Node.js 22.18+ for TypeScript feature tests.

`build:amplify` generates an ignored static host entry in `.amplify-build`, reusing the existing homepage/layout. It excludes Studio/API routes from the AWS artifact and leaves their source intact. Only `.amplify-build/out` is uploaded. Environment files, credentials, notebooks and Git history are not part of that artifact.

Sanity content is captured during build; existing fallback data is used if fetching fails. CMS changes require a new build and deployment. `NEXT_PUBLIC_SANITY_*` values are public build configuration. Private tokens must never enter browser assets.

## Authenticate and deploy

```powershell
aws login --profile portfolio-hackathon --region us-east-1
powershell -ExecutionPolicy Bypass -File scripts/deploy-amplify.ps1
```

The script checks authentication, reuses an exact matching manual app or creates it, ensures a production branch, uploads a ZIP of the exported files and starts deployment. The presigned upload URL stays in memory. Non-secret local state is saved to `.deployment/amplify.json`.

```powershell
aws amplify get-job --app-id APP_ID --branch-name main --job-id JOB_ID --profile portfolio-hackathon --region us-east-1 --query 'job.summary' --output json --no-cli-pager
```

Wait for `SUCCEED`, then check the URL without authentication. Manual hosting does not deploy Git pushes automatically. Repeat the build/deploy commands to publish changes. `amplify.yml` documents artifact settings for any future Git integration.

## Evidence and access

Capture the actual Amplify app overview and successful job in AWS Console. Use screenshots from the browser script. Keep hosting active through judging.

Public source repository: **https://github.com/Muhammad-Hamza69/hamza-pipeline-rescue-aws**. This is a clean source snapshot published with the owner's approval. The previous repository remains private; its Git history, deployment workflow, notebook and environment credentials are excluded from the public copy. The challenge requires a GitHub link but does not explicitly require public visibility.

`screenshots/aws-setup.png` is a configuration report rendered from actual AWS CLI responses, clearly labelled as a project-generated report rather than the AWS Console. A console screenshot is also recommended for the Builder Center write-up. Regenerate the report with `powershell -File scripts/record-aws-evidence.ps1` followed by `node scripts/capture-aws-evidence.mjs`.

## Deployment issue resolved

The first job completed on AWS but nested assets returned 404 because the Windows ZIP implementation used incompatible entry paths. The deployment script now creates each entry with `/` separators. Job 2's archive has 48 files, no backslash entry paths and SHA-256 `c6ad8f19501f238617e599e92286994b10c25a71643378a007d57ef2f31f78b6`. The same page and assets then passed the public browser suite. Future deployments must use the corrected packaging script.
