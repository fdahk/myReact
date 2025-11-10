Param(
    [string]$ProjectNameFile = "D:\myReact\docs\plan\project_name.txt",
    [string]$OutputPath = "D:\myReact\tempt\陪聊小铺_商业计划书.docx",
    [string]$ContentPath = "D:\myReact\docs\plan\content.txt",
    [string]$MediaDir = "D:\myReact\tempt\pptx_media",
    [string]$TitlePagePath = "D:\myReact\docs\plan\title_page.txt"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function New-HeadingNumbering {
    param($word, $doc)
    # Link Heading 1-3 to a multilevel list (Arabic) for 章/节/小节
    $gallery = $word.ListGalleries.Item(3) # wdNumberGallery
    $listTemplate = $gallery.ListTemplates.Item(1)
    foreach ($lvl in 1..3) {
        $styleName = "Heading $lvl"
        $style = $doc.Styles.Item($styleName)
        $style.LinkToListTemplate($listTemplate, $true) | Out-Null
    }
}

function Set-PageAndStyles {
    param($doc)
    $cm = 28.35
    $ps = $doc.PageSetup
    $ps.TopMargin = 2.5 * $cm
    $ps.BottomMargin = 2.5 * $cm
    $ps.LeftMargin = 2.5 * $cm
    $ps.RightMargin = 2.5 * $cm
    $ps.Gutter = 0.5 * $cm
    $ps.HeaderDistance = 1.5 * $cm
    $ps.FooterDistance = 1.5 * $cm
    # Normal style: 小四宋体, 多倍 1.2
    $normal = $doc.Styles.Item("Normal")
    $normal.NoSpaceBetweenParagraphsOfSameStyle = $false
    $normal.Font.NameFarEast = "宋体"
    $normal.Font.Name = "Calibri"
    $normal.Font.Size = 12
    $normal.ParagraphFormat.LineSpacingRule = 5  # wdLineSpaceMultiple
    $normal.ParagraphFormat.LineSpacing = 14.4   # 12pt * 1.2
    $normal.ParagraphFormat.SpaceBefore = 0
    $normal.ParagraphFormat.SpaceAfter = 0
    # Heading styles: 小二黑体（H1），H2/H3 黑体
    $h1 = $doc.Styles.Item("Heading 1")
    $h1.Font.NameFarEast = "黑体"
    $h1.Font.Size = 18
    $h1.ParagraphFormat.SpaceBefore = 12
    $h1.ParagraphFormat.SpaceAfter = 6
    $h2 = $doc.Styles.Item("Heading 2")
    $h2.Font.NameFarEast = "黑体"
    $h2.Font.Size = 16
    $h2.ParagraphFormat.SpaceBefore = 10
    $h2.ParagraphFormat.SpaceAfter = 4
    $h3 = $doc.Styles.Item("Heading 3")
    $h3.Font.NameFarEast = "黑体"
    $h3.Font.Size = 14
    $h3.ParagraphFormat.SpaceBefore = 8
    $h3.ParagraphFormat.SpaceAfter = 2
}

function Insert-Cover {
    param($selection, $projectName)
    $selection.ParagraphFormat.Alignment = 1 # center
    $selection.Style = "Heading 1"
    $selection.TypeText($projectName)
    $selection.TypeParagraph()
    $selection.TypeParagraph()
    $selection.TypeParagraph()
    $selection.ParagraphFormat.Alignment = 0 # left
}

function Insert-TitlePage {
    param($selection, $titleLines)
    $selection.ParagraphFormat.Alignment = 0
    $selection.Style = "Normal"
    foreach ($l in $titleLines) {
        $selection.TypeText($l)
        $selection.TypeParagraph()
    }
}

function Insert-HeaderFooter {
    param($doc, $projectName)
    $primaryHeader = $doc.Sections.Item(1).Headers.Item(1)
    $primaryHeader.Range.Text = $projectName
    $primaryHeader.Range.ParagraphFormat.Alignment = 1
    $primaryFooter = $doc.Sections.Item(1).Footers.Item(1)
    $primaryFooter.Range.ParagraphFormat.Alignment = 1
    $primaryFooter.PageNumbers.RestartNumberingAtSection = $false
    $primaryFooter.PageNumbers.Add() | Out-Null
}

function Insert-TOC {
    param($doc, $selection)
    $doc.TablesOfContents.Add($selection.Range, $true, 1, 3) | Out-Null
}

function Insert-Image {
    param($selection, $imagePath)
    if (-not (Test-Path -LiteralPath $imagePath)) { return }
    $selection.TypeParagraph()
    $shape = $selection.InlineShapes.AddPicture($imagePath, $false, $true)
    $shape.LockAspectRatio = $true
    $shape.Width = 340 # ~12cm
    $selection.TypeParagraph()
}

if (-not (Test-Path -LiteralPath $ContentPath)) {
    throw "正文内容文件不存在：$ContentPath"
}

$word = $null
$doc = $null
try {
    $projName = "Project"
    if (Test-Path -LiteralPath $ProjectNameFile) {
        $projName = (Get-Content -LiteralPath $ProjectNameFile -Encoding UTF8 | Out-String).Trim()
        if ([string]::IsNullOrWhiteSpace($projName)) { $projName = "Project" }
    }
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $doc = $word.Documents.Add()

    Set-PageAndStyles -doc $doc
    New-HeadingNumbering -word $word -doc $doc
    Insert-HeaderFooter -doc $doc -projectName $projName

    $sel = $word.Selection
    # 封面
    Insert-Cover -selection $sel -projectName $projName
    $sel.InsertBreak(7) # page break
    # 扉页
    $titleLines = @()
    if (Test-Path -LiteralPath $TitlePagePath) {
        $titleLines = Get-Content -LiteralPath $TitlePagePath -Encoding UTF8
    } else {
        $titleLines = @($projName, "", "东华理工大学", "大学生创新创业商业计划书")
    }
    Insert-TitlePage -selection $sel -titleLines $titleLines
    $sel.InsertBreak(7)
    # 目录
    Insert-TOC -doc $doc -selection $sel
    $sel.InsertBreak(7)

    # 读取正文并按 Markdown 风格 #/##/### 解析为 H1/H2/H3
    $lines = Get-Content -LiteralPath $ContentPath -Encoding UTF8
    $mediaList = @()
    if (Test-Path -LiteralPath $MediaDir) {
        $mediaList = Get-ChildItem -LiteralPath $MediaDir -Include *.png, *.jpg, *.jpeg -File | Sort-Object Name
    }
    $mediaIndex = 0
    foreach ($line in $lines) {
        if ($line -match '^[#]{1}\s+') {
            $text = ($line -replace '^[#]+\s+', '').Trim()
            $sel.Style = "Heading 1"
            $sel.TypeText($text)
            $sel.TypeParagraph()
            # 每个一级标题后尝试插入一张图片（如有）
            if ($mediaIndex -lt $mediaList.Count) {
                Insert-Image -selection $sel -imagePath $mediaList[$mediaIndex].FullName
                $mediaIndex++
            }
        } elseif ($line -match '^[#]{2}\s+') {
            $text = ($line -replace '^[#]+\s+', '').Trim()
            $sel.Style = "Heading 2"
            $sel.TypeText($text)
            $sel.TypeParagraph()
        } elseif ($line -match '^[#]{3}\s+') {
            $text = ($line -replace '^[#]+\s+', '').Trim()
            $sel.Style = "Heading 3"
            $sel.TypeText($text)
            $sel.TypeParagraph()
        } else {
            $sel.Style = "Normal"
            if ([string]::IsNullOrWhiteSpace($line)) {
                $sel.TypeParagraph()
            } else {
                $sel.TypeText($line.TrimEnd())
                $sel.TypeParagraph()
            }
        }
    }

    # 更新目录
    if ($doc.TablesOfContents.Count -gt 0) {
        $doc.TablesOfContents.Item(1).Update()
    }

    # 保存
    $doc.SaveAs([ref]$OutputPath, [ref]16) | Out-Null  # wdFormatDocumentDefault = 16
} finally {
    if ($doc -ne $null) { $doc.Close($true) | Out-Null }
    if ($word -ne $null) { $word.Quit() }
}

Write-Host "Generated: $OutputPath"


