/**
 * Package Mode Switcher
 * Switches between private and public npm package configurations
 */

const fs = require('fs');
const path = require('path');

const PACKAGE_JSON_PATH = path.join(__dirname, '..', 'package.json');

// Configuration templates
const PRIVATE_CONFIG = {
  name: '@private/oss-fabric',
  private: true,
  license: 'UNLICENSED',
  keywords: [
    'private',
    'microservices',
    'nodejs',
    'typescript',
    'framework',
    'internal',
    'minimal',
    'flexible',
    'versioning',
    'multi-format'
  ],
  repository: {
    type: 'git',
    url: 'private'
  },
  publishConfig: {
    access: 'restricted'
  }
};

const PUBLIC_CONFIG = {
  name: 'oss-fabric',
  private: false,
  license: 'MIT',
  keywords: [
    'microservices',
    'nodejs',
    'typescript',
    'framework',
    'oss',
    'open-source',
    'minimal',
    'flexible',
    'versioning',
    'multi-format',
    'javascript',
    'commonjs',
    'es-modules'
  ],
  repository: {
    type: 'git',
    url: 'git+https://your-repository-url.git'
  },
  publishConfig: {
    access: 'public'
  }
};

function readPackageJson() {
  const content = fs.readFileSync(PACKAGE_JSON_PATH, 'utf8');
  return JSON.parse(content);
}

function writePackageJson(packageJson) {
  fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2) + '\n');
}

function applyConfig(packageJson, config) {
  return {
    ...packageJson,
    ...config
  };
}

function switchToPrivate() {
  console.log('🔒 Switching to PRIVATE package mode...');
  
  const packageJson = readPackageJson();
  const updatedPackage = applyConfig(packageJson, PRIVATE_CONFIG);
  
  writePackageJson(updatedPackage);
  
  console.log('✅ Successfully configured as PRIVATE package:');
  console.log(`   📦 Name: ${PRIVATE_CONFIG.name}`);
  console.log(`   🔒 Private: ${PRIVATE_CONFIG.private}`);
  console.log(`   📄 License: ${PRIVATE_CONFIG.license}`);
  console.log(`   🚀 Access: ${PRIVATE_CONFIG.publishConfig.access}`);
  console.log('\n📋 Next steps for private publishing:');
  console.log('   1. Set up private npm registry or GitHub Packages');
  console.log('   2. Configure authentication: npm login --registry=<private-registry>');
  console.log('   3. Publish: npm publish --registry=<private-registry>');
}

function switchToPublic() {
  console.log('🌍 Switching to PUBLIC package mode...');
  
  const packageJson = readPackageJson();
  const updatedPackage = applyConfig(packageJson, PUBLIC_CONFIG);
  
  writePackageJson(updatedPackage);
  
  console.log('✅ Successfully configured as PUBLIC package:');
  console.log(`   📦 Name: ${PUBLIC_CONFIG.name}`);
  console.log(`   🌍 Private: ${PUBLIC_CONFIG.private}`);
  console.log(`   📄 License: ${PUBLIC_CONFIG.license}`);
  console.log(`   🚀 Access: ${PUBLIC_CONFIG.publishConfig.access}`);
  console.log('\n📋 Next steps for public publishing:');
  console.log('   1. Create npmjs.com account if needed');
  console.log('   2. Login: npm login');
  console.log('   3. Publish: npm publish');
  console.log('\n⚠️  Remember to update your LICENSE file for public distribution!');
}

function showCurrentMode() {
  const packageJson = readPackageJson();
  const isPrivate = packageJson.private === true;
  
  console.log('📊 Current Package Configuration:');
  console.log('=====================================');
  console.log(`📦 Name: ${packageJson.name}`);
  console.log(`🔒 Mode: ${isPrivate ? 'PRIVATE' : 'PUBLIC'}`);
  console.log(`📄 License: ${packageJson.license}`);
  console.log(`🚀 Access: ${packageJson.publishConfig?.access || 'not set'}`);
  console.log(`🌐 Repository: ${packageJson.repository?.url || 'not set'}`);
  console.log(`🏷️  Keywords: ${packageJson.keywords?.length || 0} keywords`);
}

function showHelp() {
  console.log('🔧 OSS Fabric Package Mode Switcher');
  console.log('=====================================');
  console.log('Usage: node scripts/package-mode.js <command>');
  console.log('');
  console.log('Commands:');
  console.log('  private    Switch to private package mode');
  console.log('  public     Switch to public package mode');
  console.log('  status     Show current package configuration');
  console.log('  help       Show this help message');
  console.log('');
  console.log('Examples:');
  console.log('  npm run pkg:private   # Switch to private mode');
  console.log('  npm run pkg:public    # Switch to public mode');
  console.log('  npm run pkg:status    # Show current mode');
}

// Main execution
const command = process.argv[2];

switch (command) {
  case 'private':
    switchToPrivate();
    break;
  case 'public':
    switchToPublic();
    break;
  case 'status':
    showCurrentMode();
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    console.log('❌ Invalid command. Use "help" to see available commands.');
    process.exit(1);
} 