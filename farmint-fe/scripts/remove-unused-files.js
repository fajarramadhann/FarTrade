const fs = require('fs');
const path = require('path');

console.log('🗑️  Removing unused files...\n');

// List of unused files to remove
const unusedFiles = [
  // Pages/Routes
  'app/create/page.tsx',
  'app/discover/page.tsx', 
  'app/farcaster/page.tsx',
  'app/nft/[id]/page.tsx',
  'app/profile/page.tsx',
  'app/stats/page.tsx',
  
  // UI Components
  'components/ui/alert.tsx',
  'components/ui/avatar.tsx',
  'components/ui/badge.tsx', 
  'components/ui/checkbox.tsx',
  'components/ui/dialog.tsx',
  'components/ui/input.tsx',
  'components/ui/label.tsx',
  'components/ui/pagination.tsx',
  'components/ui/select.tsx',
  'components/ui/tabs.tsx',
  
  // Regular Components
  'components/auth/auth-provider.tsx',
  'components/create/create-nft-form.tsx',
  'components/create/upload-progress.tsx',
  'components/discover/filter-bar.tsx',
  'components/discover/nft-grid.tsx',
  'components/miniapp/miniapp-fallback.tsx',
  'components/nft/nft-details.tsx',
  'components/nft/nft-history.tsx',
  'components/nft/nft-view.tsx',
  'components/profile/profile-header.tsx',
  'components/stats/market-overview.tsx',
  'components/stats/stats-card.tsx',
  'components/stats/top-collections.tsx',
  
  // Hooks
  'hooks/use-farcaster.tsx',
  'hooks/use-miniapp-simple.tsx',
  
  // Lib/Utils
  'lib/farcaster.ts',
  'lib/miniapp-utils.ts'
];

let removedCount = 0;
let failedCount = 0;
const failedFiles = [];

console.log(`📋 Attempting to remove ${unusedFiles.length} unused files:\n`);

unusedFiles.forEach(file => {
  try {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`✅ Removed: ${file}`);
      removedCount++;
    } else {
      console.log(`⚠️  Not found: ${file}`);
    }
  } catch (error) {
    console.log(`❌ Failed to remove: ${file} - ${error.message}`);
    failedCount++;
    failedFiles.push(file);
  }
});

// Remove empty directories
const dirsToCheck = [
  'app/create',
  'app/discover', 
  'app/nft',
  'app/profile',
  'app/stats',
  'components/auth',
  'components/create',
  'components/discover',
  'components/nft',
  'components/profile',
  'components/stats'
];

console.log('\n🗂️  Removing empty directories:');

dirsToCheck.forEach(dir => {
  try {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      if (files.length === 0) {
        fs.rmdirSync(dir);
        console.log(`✅ Removed empty directory: ${dir}`);
      } else {
        console.log(`📁 Directory not empty: ${dir} (${files.length} files)`);
      }
    }
  } catch (error) {
    console.log(`⚠️  Could not remove directory: ${dir} - ${error.message}`);
  }
});

console.log('\n📊 Summary:');
console.log(`   Files removed: ${removedCount}`);
console.log(`   Files failed: ${failedCount}`);
console.log(`   Total attempted: ${unusedFiles.length}`);

if (failedFiles.length > 0) {
  console.log('\n❌ Failed to remove:');
  failedFiles.forEach(file => console.log(`   - ${file}`));
}

console.log('\n✨ Cleanup complete!');
console.log('\n💡 Next steps:');
console.log('   1. Run: npm run build:safe');
console.log('   2. Test the application');
console.log('   3. If everything works, commit the changes');
console.log('   4. If issues occur, restore from git');

// Calculate space saved (rough estimate)
const avgFileSize = 2; // KB
const spaceSaved = removedCount * avgFileSize;
console.log(`\n💾 Estimated space saved: ~${spaceSaved}KB`);
console.log(`📉 Reduced project complexity by removing ${removedCount} unused files`);
