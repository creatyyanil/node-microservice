/**
 * OSS Fabric Framework - Main Entry Point
 * A minimal, flexible TypeScript framework skeleton for microservices
 */

// Export core functionality
export { VersionManager } from './lib/version';
export * from './lib/types';
export * from './lib/utils';

// Re-export for convenience
export { VersionManager as OSSFabric } from './lib/version';

// Default export
import { VersionManager } from './lib/version';
export default VersionManager;
