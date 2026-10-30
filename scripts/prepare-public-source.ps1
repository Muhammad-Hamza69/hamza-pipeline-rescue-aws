$ErrorActionPreference = 'Stop'
$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$snapshotRoot = [IO.Path]::GetFullPath((Join-Path $projectRoot '.deployment/public-source'))
$expectedParent = [IO.Path]::GetFullPath((Join-Path $projectRoot '.deployment'))
if ([IO.Path]::GetDirectoryName($snapshotRoot) -ne $expectedParent) { throw 'Unexpected snapshot path.' }
if (Test-Path -LiteralPath (Join-Path $snapshotRoot '.git')) { throw 'This snapshot is already a Git checkout. Update its files directly rather than replacing its history.' }
if (Test-Path -LiteralPath $snapshotRoot) { Remove-Item -LiteralPath $snapshotRoot -Recurse -Force }
New-Item -ItemType Directory -Path $snapshotRoot -Force | Out-Null

foreach ($folder in @('app', 'components', 'data', 'hooks', 'public', 'sanity', 'deployment', 'docs')) {
  Copy-Item -LiteralPath (Join-Path $projectRoot $folder) -Destination $snapshotRoot -Recurse
}
New-Item -ItemType Directory -Path (Join-Path $snapshotRoot 'scripts') | Out-Null
foreach ($script in @('build-amplify.mjs', 'preview-amplify.mjs', 'verify-portfolio.mjs', 'deploy-amplify.ps1', 'prepare-public-source.ps1', 'record-aws-evidence.ps1', 'capture-aws-evidence.mjs')) {
  Copy-Item -LiteralPath (Join-Path $PSScriptRoot $script) -Destination (Join-Path $snapshotRoot 'scripts')
}
Copy-Item -LiteralPath (Join-Path $projectRoot 'tests') -Destination $snapshotRoot -Recurse
foreach ($file in @('README.md', 'AGENTS.md', '.gitignore', '.env.local.example', 'package.json', 'package-lock.json', 'next.config.ts', 'postcss.config.mjs', 'eslint.config.mjs', 'sanity.config.ts', 'tsconfig.json', 'amplify.yml')) {
  Copy-Item -LiteralPath (Join-Path $projectRoot $file) -Destination $snapshotRoot
}

# Preserve the owner's unrelated in-progress schema edit in the original checkout;
# the public snapshot uses its committed version.
$schema = & git -C $projectRoot show HEAD:sanity/schemas/siteSettings.ts
if ($LASTEXITCODE -ne 0) { throw 'Cannot read the committed schema.' }
$schema | Set-Content -LiteralPath (Join-Path $snapshotRoot 'sanity/schemas/siteSettings.ts') -Encoding UTF8
$forbidden = @(Get-ChildItem -LiteralPath $snapshotRoot -Recurse -Force -File | Where-Object { ($_.Name -match '^\.env' -and $_.Name -ne '.env.local.example') -or $_.Name -match '\.ipynb$|\.pem$|^credentials$|^config$' })
if ($forbidden.Count -gt 0) { throw 'Unexpected private/configuration files in the public snapshot.' }
Write-Output "Prepared source snapshot: $snapshotRoot"
Write-Output 'No Git history, GitHub workflows, notebook, environment files or AWS credentials copied.'
