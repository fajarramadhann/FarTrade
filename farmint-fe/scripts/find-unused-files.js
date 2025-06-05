const fs = require('fs');
const path = require('path');

console.log('🔍 Analyzing unused files in the project...\n');

// Directories to analyze
const dirsToAnalyze = [
  'components',
  'hooks', 
  'lib',
  'types',
  'app',
  'public'
];

// Files to always keep (entry points, configs, etc.)
const alwaysKeep = [
  'app/layout.tsx',
  'app/page.tsx',
  'app/globals.css',
  'app/fonts.ts',
  'next.config.js',
  'package.json',
  'tsconfig.json',
  'tailwind.config.ts',
  'postcss.config.js',
  'components.json',
  'public/.well-known/farcaster.json'
];

// Get all TypeScript/JavaScript files
function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (file.match(/\.(tsx?|jsx?|css|json|md)$/)) {
      fileList.push(filePath.replace(/\\/g, '/'));
    }
  });
  
  return fileList;
}

// Find all import statements in a file
function findImports(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const imports = [];
    
    // Match various import patterns
    const patterns = [
      /import.*from\s+['"]([^'"]+)['"]/g,
      /import\s+['"]([^'"]+)['"]/g,
      /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
      /@\/([^'";\s]+)/g
    ];
    
    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        imports.push(match[1]);
      }
    });
    
    return imports;
  } catch (error) {
    return [];
  }
}

// Resolve import path to actual file
function resolveImportPath(importPath, fromFile) {
  // Handle relative imports
  if (importPath.startsWith('./') || importPath.startsWith('../')) {
    const fromDir = path.dirname(fromFile);
    const resolved = path.resolve(fromDir, importPath);
    
    // Try different extensions
    const extensions = ['.tsx', '.ts', '.jsx', '.js', '.css'];
    for (const ext of extensions) {
      if (fs.existsSync(resolved + ext)) {
        return (resolved + ext).replace(/\\/g, '/');
      }
    }
    
    // Try index files
    for (const ext of extensions) {
      const indexFile = path.join(resolved, 'index' + ext);
      if (fs.existsSync(indexFile)) {
        return indexFile.replace(/\\/g, '/');
      }
    }
  }
  
  // Handle @ alias imports
  if (importPath.startsWith('@/')) {
    const resolved = importPath.replace('@/', '');
    const extensions = ['.tsx', '.ts', '.jsx', '.js', '.css'];
    
    for (const ext of extensions) {
      if (fs.existsSync(resolved + ext)) {
        return (resolved + ext).replace(/\\/g, '/');
      }
    }
  }
  
  return null;
}

// Main analysis
function analyzeUsage() {
  const allFiles = [];
  
  // Get all files from directories
  dirsToAnalyze.forEach(dir => {
    getAllFiles(dir, allFiles);
  });
  
  console.log(`📁 Found ${allFiles.length} files to analyze\n`);
  
  const usedFiles = new Set();
  const importGraph = new Map();
  
  // Add always keep files
  alwaysKeep.forEach(file => {
    if (fs.existsSync(file)) {
      usedFiles.add(file.replace(/\\/g, '/'));
    }
  });
  
  // Build import graph
  allFiles.forEach(file => {
    const imports = findImports(file);
    importGraph.set(file, imports);
  });
  
  // Start from entry points and traverse
  const queue = Array.from(usedFiles);
  
  while (queue.length > 0) {
    const currentFile = queue.shift();
    
    if (importGraph.has(currentFile)) {
      const imports = importGraph.get(currentFile);
      
      imports.forEach(importPath => {
        const resolvedPath = resolveImportPath(importPath, currentFile);
        
        if (resolvedPath && allFiles.includes(resolvedPath) && !usedFiles.has(resolvedPath)) {
          usedFiles.add(resolvedPath);
          queue.push(resolvedPath);
        }
      });
    }
  }
  
  // Find unused files
  const unusedFiles = allFiles.filter(file => !usedFiles.has(file));
  
  return { allFiles, usedFiles: Array.from(usedFiles), unusedFiles };
}

// Run analysis
const { allFiles, usedFiles, unusedFiles } = analyzeUsage();

console.log('📊 Analysis Results:\n');

console.log('✅ Used Files:');
usedFiles.sort().forEach(file => {
  console.log(`   ${file}`);
});

console.log('\n🗑️  Potentially Unused Files:');
if (unusedFiles.length === 0) {
  console.log('   No unused files detected!');
} else {
  unusedFiles.sort().forEach(file => {
    console.log(`   ${file}`);
  });
}

console.log('\n📈 Summary:');
console.log(`   Total files: ${allFiles.length}`);
console.log(`   Used files: ${usedFiles.length}`);
console.log(`   Unused files: ${unusedFiles.length}`);
console.log(`   Usage rate: ${Math.round((usedFiles.length / allFiles.length) * 100)}%`);

// Categorize unused files
if (unusedFiles.length > 0) {
  console.log('\n🏷️  Unused Files by Category:');
  
  const categories = {
    'UI Components': unusedFiles.filter(f => f.includes('components/ui/')),
    'Regular Components': unusedFiles.filter(f => f.includes('components/') && !f.includes('components/ui/')),
    'Hooks': unusedFiles.filter(f => f.includes('hooks/')),
    'Lib/Utils': unusedFiles.filter(f => f.includes('lib/')),
    'Types': unusedFiles.filter(f => f.includes('types/')),
    'Pages/App': unusedFiles.filter(f => f.includes('app/')),
    'Public Assets': unusedFiles.filter(f => f.includes('public/')),
    'Other': unusedFiles.filter(f => !['components/', 'hooks/', 'lib/', 'types/', 'app/', 'public/'].some(dir => f.includes(dir)))
  };
  
  Object.entries(categories).forEach(([category, files]) => {
    if (files.length > 0) {
      console.log(`\n   ${category} (${files.length}):`);
      files.forEach(file => console.log(`     - ${file}`));
    }
  });
}

console.log('\n✨ Analysis complete!');

if (unusedFiles.length > 0) {
  console.log('\n💡 To remove unused files:');
  console.log('   1. Review the list carefully');
  console.log('   2. Backup your project first');
  console.log('   3. Remove files you\'re sure are unused');
  console.log('   4. Test the build after removal');
}
