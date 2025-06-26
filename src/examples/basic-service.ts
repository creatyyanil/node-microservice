/**
 * Basic Service Example
 * Demonstrates how to use the OSS Fabric framework
 */

import { VersionManager } from '../lib/version';
import { BasicMicroservice } from '../patterns/basic-microservice';

// Initialize version manager
const versionManager = new VersionManager();

console.log('🚀 Starting OSS Fabric Basic Service Example');
console.log('📦 Framework Version:', versionManager.current());
console.log('📋 Package Info:', versionManager.info());

// Check for deprecation warnings
versionManager.checkDeprecation({
  enableDeprecationWarnings: true,
  suppressUpgradeNotifications: false,
  deprecationSeverityThreshold: 'LOW',
});

// Create and start the microservice
const service = new BasicMicroservice({
  port: 3000,
  serviceName: 'oss-fabric-example',
  version: '1.0.0',
});

// Start the service
service.start();

console.log('✅ Basic service started successfully!');
console.log('🌐 Try these endpoints:');
console.log('   - http://localhost:3000/health');
console.log('   - http://localhost:3000/version');
console.log('   - http://localhost:3000/api/hello');
