param(
  [switch]$Production
)

$ErrorActionPreference = "Stop"

$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$RuntimeDir = Join-Path $ProjectRoot ".runtime"
$PidFile = Join-Path $RuntimeDir "careeros-server.pid"
$OutLog = Join-Path $RuntimeDir "careeros-server.out.log"
$ErrLog = Join-Path $RuntimeDir "careeros-server.err.log"

function Get-CareerOSLanAddresses {
  $Config = ipconfig | Out-String
  $Blocks = $Config -split "(\r?\n){2,}"
  $Addresses = @()

  foreach ($Block in $Blocks) {
    if ($Block -notmatch "Default Gateway[^\r\n]*:\s*\d") {
      continue
    }

    $Matches = [regex]::Matches($Block, "IPv4 Address[^\r\n]*:\s*([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)")
    foreach ($Match in $Matches) {
      $Addresses += $Match.Groups[1].Value
    }
  }

  if ($Addresses.Count -eq 0) {
    $Matches = [regex]::Matches($Config, "IPv4 Address[^\r\n]*:\s*([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)")
    foreach ($Match in $Matches) {
      $Addresses += $Match.Groups[1].Value
    }
  }

  return $Addresses | Where-Object {
    $_ -notmatch "^127\." -and $_ -notmatch "^169\.254\."
  } | Sort-Object -Unique
}

New-Item -ItemType Directory -Force -Path $RuntimeDir | Out-Null

if (Test-Path -LiteralPath $PidFile) {
  $ExistingPid = Get-Content -LiteralPath $PidFile -ErrorAction SilentlyContinue
  if ($ExistingPid -and (Get-Process -Id ([int]$ExistingPid) -ErrorAction SilentlyContinue)) {
    Write-Host "CareerOS server already appears to be running. PID: $ExistingPid"
    Write-Host "Run scripts\status_careeros_server.cmd to check URLs."
    exit 0
  }
}

if ($Production) {
  if (-not (Test-Path -LiteralPath (Join-Path $ProjectRoot ".next"))) {
    Push-Location $ProjectRoot
    npm.cmd run build
    if ($LASTEXITCODE -ne 0) {
      Pop-Location
      throw "Build failed. Server was not started."
    }
    Pop-Location
  }

  $NpmCommand = "npm.cmd run start:lan"
} else {
  $NpmCommand = "npm.cmd run dev:lan"
}

$Command = "$NpmCommand > `"$OutLog`" 2> `"$ErrLog`""
$Process = Start-Process -FilePath "cmd.exe" `
  -ArgumentList @("/c", $Command) `
  -WorkingDirectory $ProjectRoot `
  -WindowStyle Hidden `
  -PassThru

Set-Content -LiteralPath $PidFile -Value $Process.Id

$Response = $null
for ($Attempt = 1; $Attempt -le 15; $Attempt++) {
  try {
    $Response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 3
    break
  } catch {
    Start-Sleep -Seconds 2
  }
}

if ($Response) {
  Write-Host "CareerOS server started."
  Write-Host "PID: $($Process.Id)"
  Write-Host "Local URL: http://localhost:3000"

  $LanAddresses = Get-CareerOSLanAddresses
  foreach ($Address in $LanAddresses) {
    Write-Host "LAN URL: http://$Address`:3000"
  }

  Write-Host "HTTP status: $($Response.StatusCode)"
  Write-Host "Keep this Windows session signed in. Use scripts\stop_careeros_server.cmd to stop."
} else {
  Write-Host "Server process started, but localhost check failed."
  Write-Host "PID: $($Process.Id)"
  Write-Host "Read logs:"
  Write-Host $OutLog
  Write-Host $ErrLog
  exit 1
}
