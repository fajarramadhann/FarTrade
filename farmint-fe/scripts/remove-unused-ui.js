const fs = require('fs');
const path = require('path');

console.log('🧹 Removing unused UI components with missing dependencies...\n');

// List of UI components that have external dependencies that might be missing
const componentsWithDeps = [
  'command.tsx',
  'context-menu.tsx', 
  'drawer.tsx',
  'input-otp.tsx',
  'chart.tsx',
  'form.tsx',
  'calendar.tsx',
  'carousel.tsx',
  'alert-dialog.tsx',
  'accordion.tsx',
  'aspect-ratio.tsx',
  'breadcrumb.tsx',
  'collapsible.tsx',
  'dropdown-menu.tsx',
  'hover-card.tsx',
  'menubar.tsx',
  'navigation-menu.tsx',
  'popover.tsx',
  'progress.tsx',
  'radio-group.tsx',
  'resizable.tsx',
  'scroll-area.tsx',
  'separator.tsx',
  'sheet.tsx',
  'skeleton.tsx',
  'slider.tsx',
  'switch.tsx',
  'table.tsx',
  'textarea.tsx',
  'toast.tsx',
  'toggle.tsx',
  'toggle-group.tsx',
  'tooltip.tsx',
];

// Components that are definitely being used (keep these)
const usedComponents = [
  'button.tsx',
  'sonner.tsx',
  'label.tsx',
  'input.tsx',
  'card.tsx',
  'badge.tsx',
];

const uiDir = path.join(process.cwd(), 'components', 'ui');

if (!fs.existsSync(uiDir)) {
  console.log('❌ UI components directory not found');
  process.exit(1);
}

const files = fs.readdirSync(uiDir);
let removedCount = 0;
let keptCount = 0;

files.forEach(file => {
  if (!file.endsWith('.tsx')) return;
  
  const filePath = path.join(uiDir, file);
  
  if (usedComponents.includes(file)) {
    console.log(`✅ Keeping: ${file} (known to be used)`);
    keptCount++;
  } else if (componentsWithDeps.includes(file)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`🗑️  Removed: ${file} (has external dependencies)`);
      removedCount++;
    } catch (error) {
      console.log(`⚠️  Could not remove ${file}: ${error.message}`);
    }
  } else {
    console.log(`🤔 Unknown component: ${file} (keeping for safety)`);
    keptCount++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`   Removed: ${removedCount} components`);
console.log(`   Kept: ${keptCount} components`);

console.log('\n✨ Cleanup complete! The remaining UI components should build without missing dependencies.');
console.log('💡 If you need any of the removed components later, you can:');
console.log('   1. Restore them from git');
console.log('   2. Install the required dependencies');
console.log('   3. Re-add the component files');
