#!/usr/bin/env node

/**
 * Test Build Script
 * Validates that the built package works correctly
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing build output...');

// Check if dist directory exists
const distPath = path.join(__dirname, '../dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ dist/ directory not found');
  process.exit(1);
}

// Check if main files exist
const mainFiles = ['index.js', 'index.d.ts'];

for (const file of mainFiles) {
  const filePath = path.join(distPath, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ ${file} not found in dist/`);
    process.exit(1);
  }
  console.log(`✅ ${file} exists`);
}

// Try to require the built module
try {
  const builtModule = require(path.join(distPath, 'index.js'));

  // Check if VersionManager is exported
  if (!builtModule.VersionManager) {
    console.error('❌ VersionManager not exported from built module');
    process.exit(1);
  }

  // Test basic functionality
  const versionManager = new builtModule.VersionManager();
  const version = versionManager.current();

  if (!version || typeof version !== 'string') {
    console.error('❌ VersionManager.current() not working');
    process.exit(1);
  }

  console.log(`✅ VersionManager working, version: ${version}`);
} catch (error) {
  console.error('❌ Failed to require built module:', error.message);
  process.exit(1);
}

console.log('✅ Build test completed successfully!');
