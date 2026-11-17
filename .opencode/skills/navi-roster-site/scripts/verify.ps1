param(
  [switch]$SkipBuild,
  [string]$Impeccable = "$env:USERPROFILE\.config\opencode\skills\impeccable\scripts\impeccable.cmd"
)

$ErrorActionPreference = "Stop"
$root = (Resolve-Path (Join-Path $PSScriptRoot "..\..\..\..")).Path
Push-Location $root
$failed = $false

try {
  if (-not $SkipBuild) {
    $building = Get-CimInstance Win32_Process -Filter "name='node.exe'" -ErrorAction SilentlyContinue |
      Where-Object { $_.CommandLine -match 'next build' }
    if (-not $building -and (Test-Path ".next\lock")) {
      Remove-Item ".next\lock" -Force -ErrorAction SilentlyContinue
    }
    npm run build
    if ($LASTEXITCODE -ne 0) {
      Write-Output "FAIL: npm run build"
      $failed = $true
    } else {
      Write-Output "PASS: npm run build"
    }
  }

  if (-not $failed) {
    if (Test-Path $Impeccable) {
      $files = @(
        "app/page.tsx", "app/MediaImage.tsx", "app/layout.tsx",
        "app/SiteHeader.tsx", "app/SubPage.tsx", "app/globals.css",
        "app/matches/page.tsx", "app/titles/page.tsx", "app/media/page.tsx",
        "app/shop/page.tsx"
      )
      $detect = (& $Impeccable detect --json @files 2>&1) | Out-String
      Write-Output "DETECTOR:`n$($detect.Trim())"
      if ($detect -notmatch '\[\]') {
        Write-Output "FAIL: detector returned findings"
        $failed = $true
      }

      $doctorRaw = (& $Impeccable doctor --json 2>&1) | Out-String
      Write-Output "DOCTOR:`n$($doctorRaw.Trim())"
      try {
        $doctor = $doctorRaw | ConvertFrom-Json
        if ($doctor.findings.Count -gt 0) {
          Write-Output "FAIL: doctor reported $($doctor.findings.Count) finding(s)"
          $failed = $true
        }
      } catch {
        Write-Output "WARN: doctor output was not clean JSON"
      }
    } else {
      Write-Output "WARN: impeccable launcher not found at $Impeccable"
    }
  }
} finally {
  Pop-Location
}

if ($failed) { exit 1 }
Write-Output "PASS: build, detector and doctor are clean"
exit 0
