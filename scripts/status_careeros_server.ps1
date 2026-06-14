$ErrorActionPreference = "Continue"

$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$RuntimeDir = Join-Path $ProjectRoot ".runtime"
$PidFile = Join-Path $RuntimeDir "careeros-server.pid"

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

if (Test-Path -LiteralPath $PidFile) {
  $ServerPid = Get-Content -LiteralPath $PidFile -ErrorAction SilentlyContinue
  $Process = if ($ServerPid) { Get-Process -Id ([int]$ServerPid) -ErrorAction SilentlyContinue } else { $null }
  if ($Process) {
    Write-Host "Saved PID is running: $ServerPid"
  } else {
    Write-Host "Saved PID is not running: $ServerPid"
  }
} else {
  Write-Host "No saved PID file."
}

$PortRows = netstat -ano | Select-String ":3000"
if ($PortRows) {
  Write-Host "Port 3000 is listening or active:"
  $PortRows | ForEach-Object { Write-Host $_.ToString() }
} else {
  Write-Host "Port 3000 is not listening."
}

try {
  $Response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 10
  Write-Host "Local URL works: http://localhost:3000"
  Write-Host "HTTP status: $($Response.StatusCode)"
} catch {
  Write-Host "Local URL does not respond: http://localhost:3000"
}

$LanAddresses = Get-CareerOSLanAddresses
foreach ($Address in $LanAddresses) {
  Write-Host "Possible LAN URL: http://$Address`:3000"
}
