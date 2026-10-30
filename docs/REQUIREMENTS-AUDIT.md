# AWS Student Builder Challenge audit

Reviewed 30 October 2026 against the [official challenge](https://builder.aws.com/build/hackathons/3bff5627-ef21-3bfc-acfc-fce21d39a4f6/aws-student-builder-challenge-build-your-tech-superpower).

| Requirement | Original project | Work performed / remaining evidence |
| --- | --- | --- |
| Public AWS Amplify Hosting URL | Vercel history; no AWS configuration | **Deployed and verified:** https://main.d3u70dksq1w00b.amplifyapp.com — job 2 succeeded; anonymous desktop/mobile browser checks passed. |
| About Me | Present | Preserved biography and experience. |
| Skills / Tech Superpowers | Present, absent from primary navigation | Added Skills navigation and `#skills`. |
| Projects / Achievements | Present | Preserved projects, architecture walkthroughs, certifications and project links. |
| Interactive creative feature reflecting the owner | Animations and accordions without a clear personal discovery experience | Added Pipeline Rescue: three incidents, transformations on sample events, feedback, clues, reset and personal reveals grounded in existing biography. |
| Visible hint; unobstructed navigation | No dedicated feature hint | Hero invitation, Play navigation and direct project links. Playing is optional. |
| Portfolio repository link | Profile and project links only | Added a link to the approved public source snapshot at https://github.com/Muhammad-Hamza69/hamza-pipeline-rescue-aws. The original repository remains private. |
| Desktop / mobile usability | Stats overflow risk; placeholder résumé link; refresh cleared anchor | **Verified on deployed site:** 320/390/768/1440px, mobile menu, deep-link refresh, keyboard feature controls, zero runtime errors and all Next assets loaded. |
| Screenshots and write-up | Starter README | Added draft, deployment guide, audit and automated screenshot capture. Capture the real AWS Console setup after deployment. |
| Original website not published before | GitHub has successful Vercel production deployment dated 4 July 2026; old homepage missing; latest inspected URL requires sign-in | **Unresolved eligibility concern.** Owner is unsure whether the earlier deployment was public. New features, URLs and repositories do not erase publication history. Get organizer clarification. |
| Student verification, age 18+, eligible country, individual entry | Not established by source | Full Rules tab verified. Pakistan is not on the excluded-residence list; this alone does not establish personal eligibility. Student verification, age and Amazon employment/family restrictions still require owner confirmation. |
| Publish under “Your project” | Not accessible from repository/CLI | Owner must publish in Builder Center; a draft is not submitted. |

## Why this feature fits

Pipeline Rescue makes the owner's existing cloud/data engineering work playable. Visitors debug duplicate deliveries, incomplete records and event ordering. Repairs reveal engineering ownership, community leadership and architectural reasoning. No hobbies or achievements were invented.

Calculations run in the browser on fixed sample events. This is not a deployed AWS processing pipeline. This distinction is visible in the feature and submission draft.

## Architecture decision

The app uses Next.js 16.2.9. At review time, [Amplify SSR documentation](https://docs.aws.amazon.com/amplify/latest/userguide/ssr-amplify-support.html) lists Next.js 12–15. [Manual Amplify deployments](https://docs.aws.amazon.com/amplify/latest/userguide/manual-deploys.html) support static archives, not SSR archives.

The AWS artifact uses Next.js static export. Normal `/studio` and POST revalidation routes remain in source but are excluded from the static host. Sanity content is captured during build, with existing fallback data if unavailable. CMS changes need a new build/deployment. Inter and its license are bundled locally.

## Official research

- [Full Rules tab, updated 26 October 2026](https://builder.aws.com/build/hackathons/3bff5627-ef21-3bfc-acfc-fce21d39a4f6/aws-student-builder-challenge-build-your-tech-superpower?tab=rules)
- [Challenge and rubric](https://builder.aws.com/build/hackathons/3bff5627-ef21-3bfc-acfc-fce21d39a4f6/aws-student-builder-challenge-build-your-tech-superpower)
- [Day 1: account/project](https://builder.aws.com/content/3K0hPixvikMqQ93vuL1Oyu5vym5/how-to-create-your-aws-account-and-first-project)
- [Day 2: coding agent](https://builder.aws.com/content/3LKlKCv8mLiBiKLXVGTq0TKUdLR/how-to-connect-your-coding-agent-to-aws)
- [Day 3: build the portfolio](https://builder.aws.com/content/3LMXE2sf5lQtjhUK3LGwYvZIvLJ/how-to-plan-and-build-your-portfolio)
- [Amplify manual deployment API](https://docs.aws.amazon.com/cli/latest/reference/amplify/create-deployment.html)
- [Start deployment](https://docs.aws.amazon.com/cli/latest/reference/amplify/start-deployment.html)
- [AWS browser sign-in](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sign-in.html)
- [Builder Center publication FAQ](https://builder.aws.com/faq)

Day 4 was not yet linked from the public challenge page during this research. Local Next.js guides under `node_modules/next/dist/docs/` were read as required by `AGENTS.md`. Technical readiness does not constitute organizer approval of eligibility.

The full Rules tab was subsequently read after client-side hydration. It confirms Amplify Hosting is required; a contact form and its extra AWS services are optional. The judging period is 7–23 November 2026 (Pacific time). Keep hosting public throughout that period. Originality and prior-publication restrictions are explicit and remain unresolved for this pre-existing portfolio.
