/**
 * Deprecation Warning Demo
 * Shows how the version management system works
 */

import { VersionManager } from '../lib/version';

console.log('🔍 OSS Fabric Deprecation Warning Demo\n');

const versionManager = new VersionManager();

// Show current version info
console.log('📦 Current Framework Info:');
console.log('   Version:', versionManager.current());
console.log('   Package:', versionManager.info().name);
console.log('   Description:', versionManager.info().description);
console.log('');

// Test different deprecation scenarios
console.log('🧪 Testing Deprecation Scenarios:\n');

// Test 1: Check current version (should be fine)
console.log('1️⃣ Checking current version deprecation:');
const currentDeprecation = versionManager.getDeprecationInfo();
if (currentDeprecation) {
  versionManager.displayDeprecationWarning(currentDeprecation);
} else {
  console.log('   ✅ Current version is not deprecated\n');
}

// Test 2: Check an old version
console.log('2️⃣ Checking old version (1.0.0) deprecation:');
const oldDeprecation = versionManager.getDeprecationInfo('1.0.0');
if (oldDeprecation) {
  versionManager.displayDeprecationWarning(oldDeprecation);
} else {
  console.log('   ✅ Version 1.0.0 is not deprecated\n');
}

// Test 3: Check a very old version
console.log('3️⃣ Checking very old version (0.5.0) deprecation:');
const veryOldDeprecation = versionManager.getDeprecationInfo('0.5.0');
if (veryOldDeprecation) {
  versionManager.displayDeprecationWarning(veryOldDeprecation);
} else {
  console.log('   ✅ Version 0.5.0 is not deprecated\n');
}

// Test 4: Version comparison
console.log('4️⃣ Version Comparison Examples:');
console.log('   Compare 2.3.0 vs 2.2.0:', versionManager.compare('2.3.0', '2.2.0'));
console.log('   Compare 2.1.0 vs 2.3.0:', versionManager.compare('2.1.0', '2.3.0'));
console.log('   Has upgrade from 2.0.0:', versionManager.hasUpgrade('2.0.0'));
console.log('   Has upgrade from 2.3.0:', versionManager.hasUpgrade('2.3.0'));

console.log('\n✅ Deprecation demo completed!');
