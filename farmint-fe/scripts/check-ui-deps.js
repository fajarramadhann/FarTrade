const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Checking UI component dependencies...\n');

// Map of UI components to their external dependencies
const uiDependencies = {
  'command.tsx': ['cmdk', '@radix-ui/react-dialog'],
  'drawer.tsx': ['vaul'],
  'input-otp.tsx': ['input-otp'],
  'chart.tsx': ['recharts'],
  'form.tsx': ['react-hook-form', '@radix-ui/react-label'],
  'calendar.tsx': ['react-day-picker'],
  'carousel.tsx': ['embla-carousel-react'],
  'sonner.tsx': ['sonner'],
  'alert-dialog.tsx': ['@radix-ui/react-alert-dialog'],
  'checkbox.tsx': ['@radix-ui/react-checkbox'],
  'dialog.tsx': ['@radix-ui/react-dialog'],
  'label.tsx': ['@radix-ui/react-label'],
  'select.tsx': ['@radix-ui/react-select'],
  'tabs.tsx': ['@radix-ui/react-tabs'],
  'avatar.tsx': ['@radix-ui/react-avatar'],
  'accordion.tsx': ['@radix-ui/react-accordion'],
  'aspect-ratio.tsx': ['@radix-ui/react-aspect-ratio'],
  'slot.tsx': ['@radix-ui/react-slot'],
};

// Find all UI component imports in the application
function findUIComponentUsage() {
  const usedComponents = new Set();
  
  try {
    // Search for UI component imports (excluding the ui directory itself)
    const result = execSync(
      `find . -name "*.tsx" -not -path "./components/ui/*" -not -path "./node_modules/*" -not -path "./.next/*" -exec grep -l "@/components/ui/" {} \\;`,
      { encoding: 'utf8', cwd: process.cwd() }
    );
    
    const files = result.trim().split('\n').filter(f => f);
    
    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const imports = content.match(/from ['"]@\/components\/ui\/([^'"]+)['"]/g);
        
        if (imports) {
          imports.forEach(imp => {
            const match = imp.match(/from ['"]@\/components\/ui\/([^'"]+)['"]/);
            if (match) {
              usedComponents.add(match[1] + '.tsx');
            }
          });
        }
      } catch (error) {
        console.warn(`Could not read file ${file}:`, error.message);
      }
    }
  } catch (error) {
    console.warn('Could not search for UI components:', error.message);
  }
  
  return usedComponents;
}

// Check which dependencies are needed
function checkDependencies() {
  const usedComponents = findUIComponentUsage();
  const requiredDeps = new Set();
  
  console.log('📦 Used UI Components:');
  if (usedComponents.size === 0) {
    console.log('   No UI components found in use');
  } else {
    usedComponents.forEach(component => {
      console.log(`   ✓ ${component}`);
      if (uiDependencies[component]) {
        uiDependencies[component].forEach(dep => requiredDeps.add(dep));
      }
    });
  }
  
  console.log('\n📋 Required Dependencies:');
  if (requiredDeps.size === 0) {
    console.log('   No external dependencies required');
  } else {
    requiredDeps.forEach(dep => {
      console.log(`   • ${dep}`);
    });
  }
  
  // Check if dependencies are installed
  console.log('\n🔍 Dependency Status:');
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  requiredDeps.forEach(dep => {
    if (allDeps[dep]) {
      console.log(`   ✅ ${dep} - installed (${allDeps[dep]})`);
    } else {
      console.log(`   ❌ ${dep} - MISSING`);
    }
  });
  
  return { usedComponents, requiredDeps, allDeps };
}

// Main execution
const { usedComponents, requiredDeps, allDeps } = checkDependencies();

// Check for unused UI dependencies
console.log('\n🧹 Potentially Unused Dependencies:');
const uiRelatedDeps = [
  'cmdk', 'vaul', 'input-otp', 'recharts', 'react-day-picker',
  'embla-carousel-react', 'sonner', 'react-hook-form'
];

let hasUnused = false;
uiRelatedDeps.forEach(dep => {
  if (allDeps[dep] && !requiredDeps.has(dep)) {
    console.log(`   ⚠️  ${dep} - installed but not used`);
    hasUnused = true;
  }
});

if (!hasUnused) {
  console.log('   ✅ No unused UI dependencies detected');
}

// Summary
console.log('\n📊 Summary:');
console.log(`   UI Components Used: ${usedComponents.size}`);
console.log(`   Dependencies Required: ${requiredDeps.size}`);
console.log(`   Missing Dependencies: ${Array.from(requiredDeps).filter(dep => !allDeps[dep]).length}`);

const missingDeps = Array.from(requiredDeps).filter(dep => !allDeps[dep]);
if (missingDeps.length > 0) {
  console.log('\n💡 To install missing dependencies:');
  console.log(`   npm install ${missingDeps.join(' ')}`);
  console.log(`   # or`);
  console.log(`   pnpm add ${missingDeps.join(' ')}`);
}

console.log('\n✨ UI dependency check complete!');
