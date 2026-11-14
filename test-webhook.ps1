# test-webhook.ps1: one test for the VCO product webhook
Set-Location $PSScriptRoot
Get-Content .env.local | Where-Object { $_ -match '^\s*[^#=\s]+=' } | ForEach-Object { $k,$v = $_ -split '=',2; Set-Item "env:$($k.Trim())" $v.Trim() }

$url  = "https://www.paxlongevity.com/api/vco-webhook"
$ts   = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
$body = '{"event":"product.updated","data":{"slug":"test"}}'
[IO.File]::WriteAllText("$PWD\hook-body.json", $body, (New-Object Text.UTF8Encoding($false)))

$h = New-Object System.Security.Cryptography.HMACSHA256
$h.Key = [Text.Encoding]::UTF8.GetBytes($env:VCO_WEBHOOK_SECRET)
$sig = ($h.ComputeHash([Text.Encoding]::UTF8.GetBytes("$ts.$body")) | ForEach-Object { $_.ToString("x2") }) -join ""

$bad  = curl.exe -s -o NUL -w "%{http_code}" -X POST $url -d "{}"
$good = curl.exe -s -o NUL -w "%{http_code}" -X POST $url -H "Content-Type: application/json" `
  -H "x-webhook-timestamp: $ts" -H "x-webhook-signature-v1: $sig" --data-binary "@hook-body.json"
Remove-Item hook-body.json

Write-Host "Unsigned (want 401): $bad"
Write-Host "Signed   (want 200): $good"
if ($bad -eq "401" -and $good -eq "200") { Write-Host "PASS: route deployed, secret matches" -ForegroundColor Green }
elseif ($good -eq "404") { Write-Host "FAIL: route NOT deployed" -ForegroundColor Red }
elseif ($good -eq "503") { Write-Host "FAIL: VCO_WEBHOOK_SECRET missing in Vercel; redeploy" -ForegroundColor Red }
elseif ($good -eq "401") { Write-Host "FAIL: secret in Vercel differs from .env.local" -ForegroundColor Red }
else { Write-Host "FAIL: unexpected result" -ForegroundColor Red }
