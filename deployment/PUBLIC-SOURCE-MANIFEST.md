# Reviewed public-source snapshot

Approved public repository: `Muhammad-Hamza69/hamza-pipeline-rescue-aws`.

`scripts/prepare-public-source.ps1` prepares `.deployment/public-source` without publishing it. It copies the app, components, data, hooks, public assets, Sanity schemas/libraries, deployment configuration, docs/screenshots, tests, required scripts and package/build configuration.

It excludes the existing Git history and GitHub deployment workflow, environment files, AWS configuration/credentials, notebook, dependency directory, caches and built artifacts. The original user's in-progress profile-photo schema edit stays in the original checkout; the snapshot uses that schema's committed version.

The only environment-related file included is `.env.local.example`, containing placeholders. Deployment evidence contains public app/branch/job metadata, without account identity or credentials.

Publishing this snapshot creates a new public repository without changing the old private repository's visibility. Its documentation explicitly retains the unresolved earlier-publication concern. A new repository does not establish hackathon originality eligibility.
