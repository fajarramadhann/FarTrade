# Install Dependencies & Build Fix

## Quick Fix for Build Errors

### 1. Install Missing Dependencies

```bash
# Install all dependencies
npm install

# Or if using pnpm
pnpm install
```

### 2. Build the Project

```bash
# Safe build (recommended)
npm run build:safe

# Or debug build (with diagnostics)
npm run build:debug
```

## What We Fixed

### TypeScript Errors
- ✅ Fixed `MiniAppContext` naming conflict
- ✅ Created shared type definitions in `types/miniapp.ts`
- ✅ Used type-only imports where needed
- ✅ Added proper return types to hooks

### Missing Dependencies
- ✅ Added `@radix-ui/react-checkbox`
- ✅ Added `cross-env` for cross-platform environment variables
- ✅ Added `encoding` to fix node-fetch issues

### Build Configuration
- ✅ Removed invalid `telemetry` config from next.config.js
- ✅ Added `NEXT_TELEMETRY_DISABLED=1` to build scripts
- ✅ Enhanced webpack configuration for browser compatibility

## Dependencies Added

```json
{
  "dependencies": {
    "@radix-ui/react-checkbox": "^1.1.2"
  },
  "devDependencies": {
    "cross-env": "^7.0.3",
    "encoding": "^0.1.13"
  }
}
```

## Build Scripts Available

- `npm run build` - Standard build
- `npm run build:safe` - Clean then build (recommended)
- `npm run build:debug` - Full diagnostics then build
- `npm run clean` - Clean build directories
- `npm run check-env` - Check environment for issues

## If You Still Get Errors

### 1. Clear Everything and Reinstall
```bash
# Remove node_modules and lock files
rm -rf node_modules package-lock.json pnpm-lock.yaml

# Reinstall
npm install
# or
pnpm install
```

### 2. Use Windows-Specific Scripts
```bash
# PowerShell
.\build-windows.ps1

# Command Prompt
build-windows.bat
```

### 3. Manual Steps
```bash
# 1. Check environment
npm run check-env

# 2. Clean manually
npm run clean

# 3. Install dependencies
npm install

# 4. Build
npm run build
```

## Success Indicators

When everything works correctly:
- ✅ No TypeScript compilation errors
- ✅ No missing dependency errors
- ✅ Build completes successfully
- ✅ `out` folder is created (for static export)

## Common Issues & Solutions

### Issue: `Cannot find module '@radix-ui/react-checkbox'`
**Solution**: Run `npm install` to install missing dependencies

### Issue: `MiniAppContext conflicts with local value`
**Solution**: Already fixed with type-only imports

### Issue: `EPERM: operation not permitted`
**Solution**: Use `npm run build:safe` or run as Administrator

### Issue: `Invalid next.config.js options`
**Solution**: Already fixed by removing invalid telemetry config

The build should now work perfectly! 🎉
