Add-Type -AssemblyName System.Drawing

$sourcePath = "c:\Users\ADMIN\OneDrive\Desktop\axiora\assets\logo.png"
if (-not (Test-Path $sourcePath)) {
    Write-Output "Logo not found"
    exit 1
}
$sourceImg = [System.Drawing.Image]::FromFile($sourcePath)

$sizes = @(16, 32, 48, 180, 192, 512)

foreach ($size in $sizes) {
    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    
    $g.Clear([System.Drawing.Color]::Transparent)
    
    $ratio = $sourceImg.Width / $sourceImg.Height
    if ($ratio -gt 1) {
        $w = $size
        $h = $size / $ratio
        $x = 0
        $y = ($size - $h) / 2
    } else {
        $h = $size
        $w = $size * $ratio
        $x = ($size - $w) / 2
        $y = 0
    }
    
    $rect = New-Object System.Drawing.Rectangle([int]$x, [int]$y, [int]$w, [int]$h)
    $g.DrawImage($sourceImg, $rect)
    
    $outputPath = "c:\Users\ADMIN\OneDrive\Desktop\axiora\favicon-${size}x${size}.png"
    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    if ($size -eq 180) {
        $bmp.Save("c:\Users\ADMIN\OneDrive\Desktop\axiora\apple-touch-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
    }
    
    $g.Dispose()
    $bmp.Dispose()
    Write-Output "Generated favicon-${size}x${size}.png"
}

$sourceImg.Dispose()

Copy-Item "c:\Users\ADMIN\OneDrive\Desktop\axiora\favicon-48x48.png" "c:\Users\ADMIN\OneDrive\Desktop\axiora\favicon.ico" -Force
Write-Output "Generated favicon.ico"
