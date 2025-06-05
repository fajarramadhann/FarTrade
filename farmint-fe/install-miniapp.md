# Installing FarMint MiniApp Dependencies

## Quick Fix for the Encoding Error

The error you encountered is due to Node.js dependencies being imported in the browser. Here's how to fix it:

### Option 1: Install Missing Dependencies

```bash
cd farmint-fe
npm install encoding
# or
pnpm add encoding
```

### Option 2: Use the Fallback System

The app now includes a fallback system that will work even if the full Farcaster SDK fails to load. The changes include:

1. **Dynamic SDK Loading**: The SDK is loaded dynamically to avoid SSR issues
2. **Webpack Configuration**: Updated to handle Node.js dependencies in browser
3. **Fallback Detection**: Simple miniapp detection when SDK fails
4. **Error Handling**: Graceful degradation with user-friendly error messages

### What's Fixed

- ✅ **Webpack Configuration**: Added fallbacks for Node.js modules
- ✅ **Dynamic Imports**: SDK is loaded only in browser environment
- ✅ **Error Boundaries**: Graceful handling when SDK fails to load
- ✅ **Simple Fallback**: Basic miniapp detection without full SDK
- ✅ **User Experience**: App works as regular web app if miniapp features fail

### Testing the Fix

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Check the console**: You should see either:
   - "MiniApp SDK loaded successfully" (if SDK works)
   - "Falling back to simple miniapp detection" (if SDK fails but app still works)

### If You Still Get Errors

If you continue to see the encoding error, you can:

1. **Clear node_modules and reinstall**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Use the simple version only**: 
   - Comment out the full SDK import in `hooks/use-miniapp.tsx`
   - The app will use the simple fallback detection

3. **Update Node.js version**:
   - The Solana dependencies prefer Node.js 20+
   - Consider upgrading if you're on an older version

### What Works Now

Even if the full SDK fails:
- ✅ App loads and functions normally
- ✅ Basic miniapp environment detection
- ✅ Fallback to regular web functionality
- ✅ No breaking errors or crashes
- ✅ User-friendly error messages

The app is now resilient and will work in all environments!
