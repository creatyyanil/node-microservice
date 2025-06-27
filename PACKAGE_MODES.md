# Package Mode Management Guide

OSS Fabric includes a comprehensive package mode switcher that allows you to easily configure the package for either private or public distribution.

## Overview

The package mode system automatically handles all the configuration changes needed to switch between:
- **Private Mode**: For internal/corporate use with restricted access
- **Public Mode**: For open-source distribution on npm

## Quick Start

```bash
# Check current mode
npm run pkg:status

# Switch to private mode
npm run pkg:private

# Switch to public mode
npm run pkg:public

# Get help
npm run pkg:help
```

## Package Modes Comparison

| Feature | Private Mode | Public Mode |
|---------|--------------|-------------|
| **Package Name** | `@private/oss-fabric` | `oss-fabric` |
| **Private Flag** | `true` | `false` |
| **License** | `UNLICENSED` | `MIT` |
| **Access** | `restricted` | `public` |
| **Repository** | `private` | Repository URL |
| **Keywords** | 10 (includes "private", "internal") | 13 (includes "oss", "open-source") |

## Detailed Mode Configurations

### Private Mode Configuration

When you run `npm run pkg:private`, the following changes are applied:

```json
{
  "name": "@private/oss-fabric",
  "private": true,
  "license": "UNLICENSED",
  "keywords": [
    "private",
    "microservices",
    "nodejs",
    "typescript",
    "framework",
    "internal",
    "minimal",
    "flexible",
    "versioning",
    "multi-format"
  ],
  "repository": {
    "type": "git",
    "url": "private"
  },
  "publishConfig": {
    "access": "restricted"
  }
}
```

### Public Mode Configuration

When you run `npm run pkg:public`, the following changes are applied:

```json
{
  "name": "oss-fabric",
  "private": false,
  "license": "MIT",
  "keywords": [
    "microservices",
    "nodejs",
    "typescript",
    "framework",
    "oss",
    "open-source",
    "minimal",
    "flexible",
    "versioning",
    "multi-format",
    "javascript",
    "commonjs",
    "es-modules"
  ],
  "repository": {
    "type": "git",
    "url": "git+https://your-repository-url.git"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

## Publishing Workflows

### Private Publishing Workflow

1. **Switch to private mode**:
   ```bash
   npm run pkg:private
   ```

2. **Build the package**:
   ```bash
   npm run build
   ```

3. **Option A: Git-based Package Registry**
   ```bash
   # Login to Git-based package registry
   npm login --registry=https://npm.pkg.your-git-host.com
   
   # Publish to Git-based package registry
   npm publish --registry=https://npm.pkg.your-git-host.com
   ```

4. **Option B: Private npm Registry**
   ```bash
   # Login to your private registry
   npm login --registry=https://your-private-registry.com
   
   # Publish to private registry
   npm publish --registry=https://your-private-registry.com
   ```

5. **Option C: Azure Artifacts**
   ```bash
   # Configure Azure Artifacts
   npm login --registry=https://pkgs.dev.azure.com/your-org/_packaging/your-feed/npm/registry/
   
   # Publish
   npm publish --registry=https://pkgs.dev.azure.com/your-org/_packaging/your-feed/npm/registry/
   ```

### Public Publishing Workflow

1. **Switch to public mode**:
   ```bash
   npm run pkg:public
   ```

2. **Create LICENSE file**:
   ```bash
   # Copy MIT license from template
   cp LICENSE.template.md LICENSE
   # Edit LICENSE to add your name/organization
   ```

3. **Build the package**:
   ```bash
   npm run build
   ```

4. **Create npm registry account** (if needed):
   - Visit your npm registry signup page
   - Verify your email

5. **Login and publish**:
   ```bash
   # Login to npm registry
   npm login
   
   # Publish to public npm registry
   npm publish
   ```

## Command Reference

### Core Commands

```bash
# Package mode management
npm run pkg:status      # Show current package configuration
npm run pkg:private     # Switch to private package mode
npm run pkg:public      # Switch to public package mode
npm run pkg:help        # Show package mode help

# Build and quality checks
npm run build           # Build the package
npm run lint            # Lint all files
npm run format          # Format all files
npm run precommit       # Lint + format

# Package testing
npm run pack:dry        # Dry run package creation
npm run pack:check      # Check package contents
```

### Example Output

#### Status Command Output
```bash
$ npm run pkg:status

📊 Current Package Configuration:
=====================================
📦 Name: @private/oss-fabric
🔒 Mode: PRIVATE
📄 License: UNLICENSED
🚀 Access: restricted
🌐 Repository: private
🏷️  Keywords: 10 keywords
```

#### Switch to Public Mode Output
```bash
$ npm run pkg:public

🌍 Switching to PUBLIC package mode...
✅ Successfully configured as PUBLIC package:
   📦 Name: oss-fabric
   🌍 Private: false
   📄 License: MIT
   🚀 Access: public

📋 Next steps for public publishing:
   1. Create npm registry account if needed
   2. Login: npm login
   3. Publish: npm publish

⚠️  Remember to update your LICENSE file for public distribution!
```

## Installation Instructions for Users

### Installing Private Package

```bash
# From git-based package registry
npm install @private/oss-fabric --registry=https://npm.pkg.your-git-host.com

# From private registry
npm install @private/oss-fabric --registry=https://your-private-registry.com

# Set registry permanently
npm config set @private:registry https://npm.pkg.your-git-host.com
npm install @private/oss-fabric
```

### Installing Public Package

```bash
# From public npm registry (standard installation)
npm install oss-fabric

# Specific version
npm install oss-fabric@2.3.0

# Development dependency
npm install --save-dev oss-fabric
```

## Usage Examples

### Using Private Package

```typescript
// TypeScript
import { VersionManager } from '@private/oss-fabric';

const versionManager = new VersionManager();
console.log('Version:', versionManager.current());
```

```javascript
// CommonJS
const { VersionManager } = require('@private/oss-fabric');

const versionManager = new VersionManager();
console.log('Version:', versionManager.current());
```

### Using Public Package

```typescript
// TypeScript
import { VersionManager } from 'oss-fabric';

const versionManager = new VersionManager();
console.log('Version:', versionManager.current());
```

```javascript
// CommonJS
const { VersionManager } = require('oss-fabric');

const versionManager = new VersionManager();
console.log('Version:', versionManager.current());
```

## Best Practices

### For Private Distribution

1. **Use scoped package names** (`@private/oss-fabric`)
2. **Set up proper authentication** for your private registry
3. **Document internal installation instructions** for your team
4. **Use semantic versioning** for internal releases
5. **Consider using git-based package registries** for version control integration

### For Public Distribution

1. **Choose a unique package name** (check npm registry first)
2. **Include proper LICENSE file** (MIT is recommended)
3. **Write comprehensive README** with usage examples
4. **Follow semantic versioning** strictly
5. **Respond to issues and PRs** in a timely manner
6. **Include security policy** if applicable

## Troubleshooting

### Common Issues

#### Permission Denied When Publishing
```bash
# Make sure you're logged in
npm whoami

# Check registry configuration
npm config get registry

# Login again if needed
npm login
```

#### Package Name Already Exists
```bash
# Check if name is available
npm view your-package-name

# Choose a different name or use scoped package
npm run pkg:private  # Uses @private/oss-fabric
```

#### Authentication Issues with Private Registry
```bash
# Clear npm cache
npm cache clean --force

# Re-login
npm login --registry=https://your-registry.com

# Check authentication
npm config list
```

### Getting Help

1. **Check current configuration**: `npm run pkg:status`
2. **View available commands**: `npm run pkg:help`
3. **Test package creation**: `npm run pack:dry`
4. **Verify build output**: `npm run build && npm run test:build`

## Migration Guide

### From Manual Configuration

If you've been manually changing package.json for different distributions:

1. **Backup your current package.json**
2. **Run the status command** to see current configuration
3. **Use the appropriate mode command** (`pkg:private` or `pkg:public`)
4. **Verify the changes** with `pkg:status`
5. **Test building and packaging** with `npm run build && npm run pack:dry`

### Between Registries

When moving from one registry to another:

1. **Switch to appropriate mode** (private/public)
2. **Update authentication** for new registry
3. **Test installation** from new registry
4. **Update documentation** with new installation instructions

## Security Considerations

### Private Packages

- **Limit access** to authorized users only
- **Use proper authentication** (tokens, SSO)
- **Regular audit** of access permissions
- **Monitor download logs** if available

### Public Packages

- **Review code** for any sensitive information
- **Use .npmignore** to exclude private files
- **Consider security scanning** tools
- **Keep dependencies updated**

## Contributing

When contributing to OSS Fabric package mode functionality:

1. **Test both modes** thoroughly
2. **Update documentation** for any changes
3. **Ensure backward compatibility**
4. **Follow the coding standards**
5. **Add tests** for new features

For questions or issues, please refer to the [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) or contact your development team. 