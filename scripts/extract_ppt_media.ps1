Param(
    [string]$PptxPath = "D:\myReact\tempt\陪聊小铺：大学生情绪陪伴计划 (1).pptx",
    [string]$UnzipDir = "D:\myReact\tempt\pptx_unzip",
    [string]$MediaDir = "D:\myReact\tempt\pptx_media"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $PptxPath)) {
    throw "PPTX file not found: $PptxPath"
}

if (Test-Path -LiteralPath $UnzipDir) {
    Remove-Item -LiteralPath $UnzipDir -Recurse -Force
}
New-Item -ItemType Directory -Path $UnzipDir -Force | Out-Null

Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::ExtractToDirectory($PptxPath, $UnzipDir)

New-Item -ItemType Directory -Path $MediaDir -Force | Out-Null
$mediaSrc = Join-Path $UnzipDir "ppt\media"
if (Test-Path -LiteralPath $mediaSrc) {
    Get-ChildItem -LiteralPath $mediaSrc -File | ForEach-Object {
        Copy-Item -LiteralPath $_.FullName -Destination $MediaDir -Force
    }
} else {
    Write-Warning "No media folder found in PPTX (expected: $mediaSrc)."
}

Write-Host "Media extracted to: $MediaDir"


