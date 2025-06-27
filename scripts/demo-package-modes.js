/**
 * Package Mode Demonstration Script
 * Shows the functionality of switching between private and public modes
 */

const { execSync } = require('child_process');

function runCommand(command) {
  console.log(`\n🔧 Running: ${command}`);
  console.log('─'.repeat(50));
  try {
    const output = execSync(command, { encoding: 'utf8', cwd: __dirname + '/..' });
    console.log(output);
  } catch (error) {
    console.log(error.stdout || error.message);
  }
}

console.log('🚀 OSS Fabric Package Mode Demonstration');
console.log('========================================');

console.log('\n📊 1. Current Package Status:');
runCommand('npm run pkg:status');

console.log('\n🌍 2. Switching to Public Mode:');
runCommand('npm run pkg:public');

console.log('\n📊 3. Status After Switching to Public:');
runCommand('npm run pkg:status');

console.log('\n🔒 4. Switching Back to Private Mode:');
runCommand('npm run pkg:private');

console.log('\n📊 5. Final Status (Private Mode):');
runCommand('npm run pkg:status');

console.log('\n✅ Package Mode Demonstration Complete!');
console.log('========================================');
console.log('🎯 Key Features Demonstrated:');
console.log('  ✅ Package name switching (@private/oss-fabric ↔ oss-fabric)');
console.log('  ✅ License switching (UNLICENSED ↔ MIT)');
console.log('  ✅ Access control (restricted ↔ public)');
console.log('  ✅ Repository URL switching (private ↔ GitHub)');
console.log('  ✅ Keyword management (automatic updates)');
console.log('\n📋 Next Steps:');
console.log('  1. Use npm run pkg:private for internal distribution');
console.log('  2. Use npm run pkg:public for open source distribution');
console.log('  3. Create LICENSE file when switching to public mode');
console.log('  4. Configure appropriate npm registry for publishing'); 