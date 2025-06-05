#!/bin/bash

# Netlify build script for FarMint
echo "🚀 Starting Netlify build for FarMint..."

# Set environment variables
export NEXT_TELEMETRY_DISABLED=1
export DISABLE_OPENCOLLECTIVE=1

# Navigate to the frontend directory
cd farmint-fe

echo "📦 Installing dependencies..."

# Try npm first (most reliable on Netlify)
if command -v npm &> /dev/null; then
    echo "Using npm..."
    npm ci --legacy-peer-deps || npm install --legacy-peer-deps
elif command -v pnpm &> /dev/null; then
    echo "Using pnpm..."
    pnpm install --frozen-lockfile=false
else
    echo "❌ No package manager found!"
    exit 1
fi

echo "🏗️  Building the application..."

# Build the project
npm run build || pnpm build

# Check if build was successful
if [ -d "out" ]; then
    echo "✅ Build successful! Output directory created."
    echo "📁 Files in output directory:"
    ls -la out/
else
    echo "❌ Build failed! No output directory found."
    exit 1
fi

echo "🎉 Netlify build completed successfully!"
