param(
  [string]$Profile = 'portfolio-hackathon',
  [ValidateSet('us-east-1')][string]$Region = 'us-east-1'
)
$ErrorActionPreference = 'Stop'
$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$artifactRoot = [IO.Path]::GetFullPath((Join-Path $projectRoot '.amplify-build/out'))
$stateRoot = Join-Path $projectRoot '.deployment'
$branchName = 'main'

function Invoke-PortfolioAws {
  param([string[]]$Arguments)
  $result = & aws @Arguments --profile $Profile --region $Region --output json --no-cli-pager
  if ($LASTEXITCODE -ne 0) { throw 'AWS command failed. Check the preceding AWS error.' }
  if ($result) { return ($result -join "`n" | ConvertFrom-Json) }
}

if (-not (Test-Path -LiteralPath (Join-Path $artifactRoot 'index.html'))) { throw 'Run npm run build:amplify before deployment.' }
$null = Invoke-PortfolioAws -Arguments @('sts', 'get-caller-identity')
$apps = Invoke-PortfolioAws -Arguments @('amplify', 'list-apps')
$matchingApps = @($apps.apps | Where-Object { $_.name -eq 'hamza-pipeline-rescue' })
if ($matchingApps.Count -gt 1) { throw 'Multiple matching apps; select the intended app before deploying.' }
if ($matchingApps.Count -eq 1) {
  $app = $matchingApps[0]
  if ($app.platform -ne 'WEB' -or $app.repository) { throw 'Existing app is not the expected manual static app.' }
} else {
  $inputPath = Join-Path $projectRoot 'deployment/amplify-app.json'
  $created = Invoke-PortfolioAws -Arguments @('amplify', 'create-app', '--cli-input-json', "file://$inputPath")
  $app = $created.app
}
$branches = Invoke-PortfolioAws -Arguments @('amplify', 'list-branches', '--app-id', $app.appId)
if (-not ($branches.branches | Where-Object { $_.branchName -eq $branchName })) {
  $null = Invoke-PortfolioAws -Arguments @('amplify', 'create-branch', '--app-id', $app.appId, '--branch-name', $branchName, '--stage', 'PRODUCTION', '--no-enable-basic-auth', '--no-enable-auto-build')
}

New-Item -ItemType Directory -Path $stateRoot -Force | Out-Null
$zipPath = Join-Path $stateRoot 'portfolio.zip'
if (([IO.Path]::GetDirectoryName([IO.Path]::GetFullPath($zipPath))) -ne $stateRoot) { throw 'Unexpected artifact path.' }
if (Test-Path -LiteralPath $zipPath) { Remove-Item -LiteralPath $zipPath }
Add-Type -AssemblyName System.IO.Compression.FileSystem
Add-Type -AssemblyName System.IO.Compression
# Windows PowerShell's CreateFromDirectory can use backslash entry names, which
# Amplify does not resolve as URL paths. Always write portable ZIP entry names.
$archive = [IO.Compression.ZipFile]::Open($zipPath, [IO.Compression.ZipArchiveMode]::Create)
try {
  foreach ($file in (Get-ChildItem -LiteralPath $artifactRoot -Recurse -File)) {
    $entryName = $file.FullName.Substring($artifactRoot.Length + 1).Replace('\', '/')
    $null = [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $file.FullName, $entryName, [IO.Compression.CompressionLevel]::Optimal)
  }
} finally { $archive.Dispose() }
$artifactHash = (Get-FileHash -LiteralPath $zipPath -Algorithm SHA256).Hash.ToLowerInvariant()
$deployment = Invoke-PortfolioAws -Arguments @('amplify', 'create-deployment', '--app-id', $app.appId, '--branch-name', $branchName)
$state = [ordered]@{ appId = $app.appId; appName = $app.name; region = $Region; branch = $branchName; jobId = $deployment.jobId; url = "https://$branchName.$($app.defaultDomain)"; artifactSha256 = $artifactHash; phase = 'uploading' }
$statePath = Join-Path $stateRoot 'amplify.json'
$state | ConvertTo-Json | Set-Content -LiteralPath $statePath -Encoding UTF8
# The presigned upload URL stays in memory and is never logged or saved.
$null = Invoke-WebRequest -Uri $deployment.zipUploadUrl -Method Put -InFile $zipPath -ContentType 'application/zip' -UseBasicParsing
$started = Invoke-PortfolioAws -Arguments @('amplify', 'start-deployment', '--app-id', $app.appId, '--branch-name', $branchName, '--job-id', $deployment.jobId)
$state.phase = $started.jobSummary.status
$state | ConvertTo-Json | Set-Content -LiteralPath $statePath -Encoding UTF8
$state | ConvertTo-Json
