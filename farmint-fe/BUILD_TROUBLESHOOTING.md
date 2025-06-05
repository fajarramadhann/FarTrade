# Build Troubleshooting Guide

## The EPERM Error Fix

The `EPERM: operation not permitted` error is a common Windows issue related to file permissions and Next.js trace files.

## Quick Solutions

### Option 1: Use the Safe Build Script

```bash
# This will clean and build safely
pnpm run build:safe
# or
npm run build:safe
```

### Option 2: Use PowerShell Script (Windows)

```powershell
# Run in PowerShell as Administrator (recommended)
.\build-windows.ps1
```

### Option 3: Manual Steps

1. **Clean first**:
   ```bash
   pnpm run clean
   # or
   npm run clean
   ```

2. **Then build**:
   ```bash
   pnpm run build
   # or
   npm run build
   ```

### Option 4: Delete .next folder manually

If scripts fail, manually delete the `.next` folder:

```bash
# On Windows (Command Prompt)
rmdir /s /q .next

# On Windows (PowerShell)
Remove-Item -Recurse -Force .next

# On Unix/Mac
rm -rf .next
```

## Environment Variables

Add these to your environment to reduce permission issues:

```bash
# Disable telemetry
NEXT_TELEMETRY_DISABLED=1

# Disable OpenCollective
DISABLE_OPENCOLLECTIVE=1
```

## What We Fixed

1. **Next.js Configuration**:
   - Disabled telemetry
   - Disabled trace collection
   - Added experimental settings to reduce file operations

2. **Build Scripts**:
   - Added `clean` script to remove build directories
   - Added `prebuild` hook to auto-clean before building
   - Added `build:safe` script for problematic environments

3. **Windows-Specific**:
   - Created PowerShell script with retry logic
   - Alternative file deletion methods
   - Proper error handling

## If You Still Get Errors

### 1. Run as Administrator
```powershell
# Right-click PowerShell and "Run as Administrator"
.\build-windows.ps1
```

### 2. Check Antivirus
Some antivirus software can lock files. Try:
- Temporarily disable real-time protection
- Add the project folder to antivirus exclusions

### 3. Close All Editors
Make sure no editors (VS Code, etc.) have files open in the `.next` directory.

### 4. Use Different Terminal
Try building in:
- Command Prompt (cmd)
- PowerShell
- Git Bash
- WSL (if available)

### 5. Alternative Build Method

If all else fails, you can build without static export:

```javascript
// Temporarily modify next.config.js
const nextConfig = {
  // Comment out this line temporarily
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  // ... rest of config
};
```

Then run:
```bash
pnpm build && pnpm start
```

## Deployment Options

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build for static export
pnpm run build:safe

# Deploy the 'out' folder to Netlify
```

### GitHub Pages
```bash
# Build for static export
pnpm run build:safe

# Deploy the 'out' folder to GitHub Pages
```

## Success Indicators

When the build works correctly, you should see:
- ✅ No EPERM errors
- ✅ `.next` folder created successfully
- ✅ `out` folder created (for static export)
- ✅ Build completes without crashes

## Need Help?

If you're still having issues:

1. **Check Node.js version**: `node --version` (should be 18+)
2. **Check npm/pnpm version**: `pnpm --version`
3. **Try in a different directory** (shorter path)
4. **Check disk space** (ensure you have enough free space)

The build should now work reliably! 🎉
