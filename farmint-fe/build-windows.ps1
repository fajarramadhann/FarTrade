# PowerShell script to build the project on Windows
# This handles permission issues that can occur on Windows

Write-Host "🚀 Starting Windows build process..." -ForegroundColor Green

# Function to remove directory with retry
function Remove-DirectoryWithRetry {
    param([string]$Path)
    
    if (Test-Path $Path) {
        Write-Host "🧹 Cleaning $Path..." -ForegroundColor Yellow
        
        try {
            # Try to remove normally first
            Remove-Item -Path $Path -Recurse -Force -ErrorAction Stop
            Write-Host "✅ Cleaned $Path" -ForegroundColor Green
        }
        catch {
            Write-Host "⚠️  Standard cleanup failed, trying alternative method..." -ForegroundColor Yellow
            
            try {
                # Alternative method: remove files first, then directories
                Get-ChildItem -Path $Path -Recurse -File | Remove-Item -Force
                Get-ChildItem -Path $Path -Recurse -Directory | Sort-Object FullName -Descending | Remove-Item -Force
                Remove-Item -Path $Path -Force
                Write-Host "✅ Cleaned $Path (alternative method)" -ForegroundColor Green
            }
            catch {
                Write-Host "❌ Could not clean $Path. You may need to delete it manually." -ForegroundColor Red
                Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
            }
        }
    }
}

# Clean build directories
$buildDirs = @(".next", "out", ".vercel", "dist")

foreach ($dir in $buildDirs) {
    Remove-DirectoryWithRetry -Path $dir
}

# Set environment variables to avoid permission issues
$env:NEXT_TELEMETRY_DISABLED = "1"
$env:DISABLE_OPENCOLLECTIVE = "1"

Write-Host "📦 Running build..." -ForegroundColor Blue

try {
    # Run the build
    if (Get-Command pnpm -ErrorAction SilentlyContinue) {
        pnpm build
    } elseif (Get-Command npm -ErrorAction SilentlyContinue) {
        npm run build
    } else {
        Write-Host "❌ Neither npm nor pnpm found!" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Build completed successfully!" -ForegroundColor Green
}
catch {
    Write-Host "❌ Build failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "🎉 Build process complete!" -ForegroundColor Green
