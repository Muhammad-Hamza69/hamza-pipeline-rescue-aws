# Pipeline Rescue — Meet the Engineer Behind the Data

Draft to review and paste into Builder Center. This file is not a submitted entry. Verify the personal statements, originality eligibility, live URL and source access before publishing.

## Short description

A cloud and data engineering portfolio with a playable Pipeline Rescue lab. Visitors repair three small data incidents, watch fixes change the output, and unlock the engineering habits and community story behind the projects. Hosted as a static website on AWS Amplify Hosting.

## What I built

My portfolio introduces me, my skills, projects and architecture walkthroughs. Visitors can browse everything directly. The optional creative feature explains how I think about data systems.

1. **Double delivery:** remove a retried event so revenue is counted once.
2. **Missing meaning:** quarantine an incomplete record instead of inventing a zero-value sale.
3. **Out of order:** reconstruct a finite batch using event timestamps rather than arrival order.

Each patch transforms sample events. Visitors inspect output rows, calculated revenue, duplicate count and quarantine count. Incorrect choices explain the problem and allow a retry. Successful repairs reveal full-pipeline ownership, community leadership or architectural reasoning from my existing portfolio biography.

A hero invitation and Play navigation make the lab easy to find. No timer, login or game completion blocks access to projects. Standard form controls work with keyboard, touch and mouse, and a live region announces feedback.

## AWS services and architecture

- **AWS Amplify Hosting:** public HTTPS hosting for exported HTML, CSS, JavaScript and assets in `us-east-1`.
- **AWS CLI:** browser authentication, app/branch provisioning, archive upload, deployment and status verification.
- Amplify manages the delivery infrastructure. No separately administered CloudFront distribution or public S3 bucket is provisioned by this project.
- Sanity is an external build-time CMS. The public AWS page serves a snapshot, so visitors do not need a CMS connection.
- Pipeline Rescue runs in the browser. It does not provision Lambda, Kinesis, DynamoDB or a runtime data-processing backend.

```text
Portfolio source + optional Sanity content
                 |
           Static Next.js build
                 |
          HTML / CSS / JS / assets
                 |
       AWS Amplify Hosting (us-east-1)
                 |
         Public HTTPS portfolio
                 |
        Rescue simulation in browser
```

**Live portfolio:** https://main.d3u70dksq1w00b.amplifyapp.com

**Public repository:** https://github.com/Muhammad-Hamza69/hamza-pipeline-rescue-aws

## What I learned

Review and personalize these reflections before presenting them as your own:

- Framework support matters: Next.js 16 required an approach compatible with Amplify's documented support. Static export fits a presentation-focused portfolio.
- A creative feature is stronger when it explains the person. Pipeline debugging reflects the work already shown on the site.
- A success animation is insufficient: the lab calculates real transformations on sample data, with tests for all three incidents.
- Deployment documentation should distinguish an actual cloud backend from a browser simulation.

## Challenges addressed

The existing app assumes a dynamic Next.js server, a CMS Studio and a POST revalidation route. A generated static host entry reuses the homepage and components without exporting server-only routes. CMS changes require a fresh deployment.

Google Fonts downloads were unreliable during production builds; the licensed font is now bundled locally. Mobile statistics, placeholder résumé links and section deep links were also improved.

One AWS job reported success while nested CSS and JavaScript files still returned 404. Public browser verification exposed the problem: the Windows archive needed portable `/` path separators. The packaging script was corrected and the successful second deployment passed the browser suite. This is why I verified the actual website in addition to the AWS job status.

## Screenshots to attach

- `screenshots/portfolio-desktop.png`: portfolio and creative-feature invitation.
- `screenshots/portfolio-mobile.png`: mobile layout.
- `screenshots/pipeline-rescue.png`: successful rescue and story reveal.
- `screenshots/pipeline-rescue-mobile.png`: mobile interaction.
- `screenshots/aws-setup.png`: actual AWS configuration/job data rendered as a clearly labelled project report, not an AWS Console screenshot.
- A genuine AWS Console screenshot of this app and its successful deployment. Hide account/billing details. A generated illustration is not deployment proof.

## Before publishing

- Confirm verified student status, age, country and Rules-tab eligibility.
- Resolve earlier Vercel publication with the organizer. Do not claim the portfolio was never published without evidence.
- Check AWS and source URLs without signing in; attach screenshots and personalize this draft.
- Publish under “Your project” before 6 November 2026, 11:59 PM PST (7 November, 12:59 PM Pakistan time).
- Keep AWS hosting available throughout both judging rounds and the announcement period.
