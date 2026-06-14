$ErrorActionPreference = "Stop"

$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$RuntimeDir = Join-Path $ProjectRoot ".runtime"
$PidFile = Join-Path $RuntimeDir "careeros-server.pid"

if (-not (Test-Path -LiteralPath $PidFile)) {
  Write-Host "No CareerOS PID file found. Nothing to stop."
  exit 0
}

$ServerPid = Get-Content -LiteralPath $PidFile -ErrorAction SilentlyContinue
if ($ServerPid -and (Get-Process -Id ([int]$ServerPid) -ErrorAction SilentlyContinue)) {
  Stop-Process -Id ([int]$ServerPid) -Force
  Write-Host "Stopped CareerOS server. PID: $ServerPid"
} else {
  Write-Host "Saved CareerOS PID is not running."
}

$PortRows = netstat -ano | Select-String ":3000"
foreach ($Row in $PortRows) {
  $Parts = ($Row.ToString() -split "\s+") | Where-Object { $_ -ne "" }
  if ($Parts.Length -ge 5) {
    $PortPid = [int]$Parts[-1]
    if (Get-Process -Id $PortPid -ErrorAction SilentlyContinue) {
      Stop-Process -Id $PortPid -Force -ErrorAction SilentlyContinue
      Write-Host "Stopped process using port 3000. PID: $PortPid"
    }
  }
}

Remove-Item -LiteralPath $PidFile -Force -ErrorAction SilentlyContinue
