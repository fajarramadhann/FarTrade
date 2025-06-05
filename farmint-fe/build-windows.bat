@echo off
echo 🚀 Starting Windows build process...

REM Set environment variables to avoid permission issues
set NEXT_TELEMETRY_DISABLED=1
set DISABLE_OPENCOLLECTIVE=1

echo 🧹 Cleaning build directories...

REM Clean .next directory
if exist ".next" (
    echo Removing .next directory...
    rmdir /s /q ".next" 2>nul
    if exist ".next" (
        echo Warning: Could not remove .next directory completely
    ) else (
        echo ✅ Cleaned .next directory
    )
)

REM Clean out directory
if exist "out" (
    echo Removing out directory...
    rmdir /s /q "out" 2>nul
    if exist "out" (
        echo Warning: Could not remove out directory completely
    ) else (
        echo ✅ Cleaned out directory
    )
)

REM Clean other build directories
if exist ".vercel" rmdir /s /q ".vercel" 2>nul
if exist "dist" rmdir /s /q "dist" 2>nul

echo 📦 Running build...

REM Check if pnpm is available
where pnpm >nul 2>nul
if %ERRORLEVEL% == 0 (
    echo Using pnpm...
    pnpm build
) else (
    REM Check if npm is available
    where npm >nul 2>nul
    if %ERRORLEVEL% == 0 (
        echo Using npm...
        npm run build
    ) else (
        echo ❌ Neither npm nor pnpm found!
        pause
        exit /b 1
    )
)

if %ERRORLEVEL% == 0 (
    echo ✅ Build completed successfully!
    echo 🎉 Build process complete!
) else (
    echo ❌ Build failed!
    pause
    exit /b 1
)

pause
