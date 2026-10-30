param([string]$Profile = 'portfolio-hackathon')
$ErrorActionPreference = 'Stop'
$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$state = Get-Content -LiteralPath (Join-Path $projectRoot '.deployment/amplify.json') -Raw | ConvertFrom-Json
function Read-PortfolioAws {
  param([string[]]$Arguments)
  $result = & aws @Arguments --profile $Profile --region $state.region --output json --no-cli-pager
  if ($LASTEXITCODE -ne 0) { throw 'Cannot read deployment evidence.' }
  return ($result -join "`n" | ConvertFrom-Json)
}
$app = Read-PortfolioAws -Arguments @('amplify', 'get-app', '--app-id', $state.appId, '--query', 'app.{appId:appId,name:name,platform:platform,defaultDomain:defaultDomain,enableBasicAuth:enableBasicAuth}')
$branch = Read-PortfolioAws -Arguments @('amplify', 'get-branch', '--app-id', $state.appId, '--branch-name', $state.branch, '--query', 'branch.{branchName:branchName,stage:stage,enableBasicAuth:enableBasicAuth,enableAutoBuild:enableAutoBuild}')
$job = Read-PortfolioAws -Arguments @('amplify', 'get-job', '--app-id', $state.appId, '--branch-name', $state.branch, '--job-id', $state.jobId, '--query', 'job.summary.{jobId:jobId,status:status,startTime:startTime,endTime:endTime}')
if ($job.status -ne 'SUCCEED') { throw "Deployment has not succeeded yet: $($job.status)" }
$evidence = [ordered]@{ capturedAt = [DateTime]::UtcNow.ToString('o'); source = 'Actual AWS CLI responses, sanitized; not an AWS Console screenshot'; region = $state.region; url = $state.url; artifactSha256 = $state.artifactSha256; app = $app; branch = $branch; job = $job }
$evidence | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath (Join-Path $projectRoot 'docs/aws-deployment.json') -Encoding UTF8
$state.phase = 'SUCCEED'
$state | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $projectRoot '.deployment/amplify.json') -Encoding UTF8
$evidence | ConvertTo-Json -Depth 6
