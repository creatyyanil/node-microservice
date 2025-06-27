/**
 * Basic Service Example
 * A simple example showing how to use the OSS Fabric framework
 */

import { VersionManager } from '../lib/version';

// Initialize version manager
const versionManager = new VersionManager();

console.log('🚀 OSS Fabric Basic Service Example');
console.log('Current version:', versionManager.current());
console.log('Package info:', versionManager.info());

// Check for deprecation warnings
versionManager.checkDeprecation();

console.log('✅ Basic service example completed!');
