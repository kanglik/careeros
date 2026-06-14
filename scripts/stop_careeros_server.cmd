@echo off
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0stop_careeros_server.ps1" %*
pause
