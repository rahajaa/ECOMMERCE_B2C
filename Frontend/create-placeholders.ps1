# Script PowerShell : Créer les images placeholders (Frontend/)
# À exécuter depuis le dossier Frontend/

# Créer la structure de dossiers
$assetsPath = "src/assets/images"
if (!(Test-Path $assetsPath)) {
    New-Item -ItemType Directory -Path $assetsPath -Force
}

Write-Host "📁 Création du dossier : $assetsPath" -ForegroundColor Green

# 1. hero_bg.jpg (1920x600 - Hero background)
Write-Host "🖼️  Création hero_bg.jpg..." -ForegroundColor Yellow
$heroBg = New-Object System.Drawing.Bitmap(1920, 600)
$graphics = [System.Drawing.Graphics]::FromImage($heroBg)
$graphics.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255,45,85,156))), 0, 0, 1920, 600)
$font = New-Object System.Drawing.Font("Segoe UI", 48, [System.Drawing.FontStyle]::Bold)
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$graphics.DrawString("HERO BANNER", $font, $brush, 600, 250)
$graphics.Dispose()
$heroBg.Save("$assetsPath/hero_bg.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$heroBg.Dispose()
Write-Host "✅ hero_bg.jpg créé (1920x600)" -ForegroundColor Green

# 2. produit.jpg (300x300 - Produit)
Write-Host "🖼️  Création produit.jpg..." -ForegroundColor Yellow
$produit = New-Object System.Drawing.Bitmap(300, 300)
$graphics = [System.Drawing.Graphics]::FromImage($produit)
$graphics.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255,76,175,80))), 0, 0, 300, 300)
$font = New-Object System.Drawing.Font("Segoe UI", 24, [System.Drawing.FontStyle]::Bold)
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$graphics.DrawString("PRODUIT", $font, $brush, 60, 130)
$graphics.Dispose()
$produit.Save("$assetsPath/produit.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$produit.Dispose()
Write-Host "✅ produit.jpg créé (300x300)" -ForegroundColor Green

# 3. categorie.jpg (250x250 - Catégorie)
Write-Host "🖼️  Création categorie.jpg..." -ForegroundColor Yellow
$categorie = New-Object System.Drawing.Bitmap(250, 250)
$graphics = [System.Drawing.Graphics]::FromImage($categorie)
$graphics.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255,156,39,176))), 0, 0, 250, 250)
$font = New-Object System.Drawing.Font("Segoe UI", 20, [System.Drawing.FontStyle]::Bold)
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$graphics.DrawString("CATEGORIE", $font, $brush, 30, 110)
$graphics.Dispose()
$categorie.Save("$assetsPath/categorie.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$categorie.Dispose()
Write-Host "✅ categorie.jpg créé (250x250)" -ForegroundColor Green

# 4. placeholder-partner.png (120x60 - Logo partenaire)
Write-Host "🖼️  Création placeholder-partner.png..." -ForegroundColor Yellow
$partner = New-Object System.Drawing.Bitmap(120, 60)
$graphics = [System.Drawing.Graphics]::FromImage($partner)
$graphics.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255,33,150,243))), 0, 0, 120, 60)
$font = New-Object System.Drawing.Font("Segoe UI", 12, [System.Drawing.FontStyle]::Bold)
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$graphics.DrawString("PARTENAIRE", $font, $brush, 8, 20)
$graphics.Dispose()
$partner.Save("$assetsPath/placeholder-partner.png", [System.Drawing.Imaging.ImageFormat]::Png)
$partner.Dispose()
Write-Host "✅ placeholder-partner.png créé (120x60)" -ForegroundColor Green

# 5. placeholder-investor.png (140x60 - Logo investisseur)
Write-Host "🖼️  Création placeholder-investor.png..." -ForegroundColor Yellow
$investor = New-Object System.Drawing.Bitmap(140, 60)
$graphics = [System.Drawing.Graphics]::FromImage($investor)
$graphics.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255,255,193,7))), 0, 0, 140, 60)
$font = New-Object System.Drawing.Font("Segoe UI", 11, [System.Drawing.FontStyle]::Bold)
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(50,0,0,0))
$graphics.DrawString("INVESTISSEUR", $font, $brush, 10, 22)
$graphics.Dispose()
$investor.Save("$assetsPath/placeholder-investor.png", [System.Drawing.Imaging.ImageFormat]::Png)
$investor.Dispose()
Write-Host "✅ placeholder-investor.png créé (140x60)" -ForegroundColor Green

Write-Host "`n🎉 TOUTES LES IMAGES ONT ÉTÉ CRÉÉES !" -ForegroundColor Cyan
Write-Host "📂 Dossier : src/assets/images/" -ForegroundColor Cyan
Write-Host "✅ Prêt pour Vite ! npm run dev" -ForegroundColor Green
