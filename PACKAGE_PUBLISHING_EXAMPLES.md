# Package Publishing Examples

This document provides practical, step-by-step examples for publishing OSS Fabric in different scenarios.

## Example 1: Publishing to Git-based Package Registry (Private)

### Prerequisites
- Git repository with OSS Fabric code
- Git-based package registry account with permissions

### Steps

1. **Switch to private mode**:
   ```bash
   npm run pkg:private
   ```

2. **Verify configuration**:
   ```bash
   npm run pkg:status
   # Should show: Name: @private/oss-fabric, Access: restricted
   ```

3. **Create `.npmrc` file** in your project root:
   ```
   @private:registry=https://npm.pkg.your-git-host.com
   ```

4. **Login to Git-based Package Registry**:
   ```bash
   npm login --scope=@private --registry=https://npm.pkg.your-git-host.com
   # Username: your-username
   # Password: your-access-token (not your password!)
   ```

5. **Build and publish**:
   ```bash
   npm run build
   npm publish
   ```

6. **Install in other projects**:
   ```bash
   npm install @private/oss-fabric --registry=https://npm.pkg.your-git-host.com
   ```

## Example 2: Publishing to Public NPM Registry (Public)

### Prerequisites
- Public npm registry account
- Unique package name available

### Steps

1. **Check if package name is available**:
   ```bash
   npm view oss-fabric
   # Should return: npm ERR! 404 'oss-fabric' is not in the npm registry
   ```

2. **Switch to public mode**:
   ```bash
   npm run pkg:public
   ```

3. **Create LICENSE file**:
   ```bash
   # Copy MIT license from template
   cp LICENSE.template.md LICENSE
   # Edit LICENSE file to add your name/organization
   ```

4. **Verify configuration**:
   ```bash
   npm run pkg:status
   # Should show: Name: oss-fabric, License: MIT, Access: public
   ```

5. **Login to npm registry**:
   ```bash
   npm login
   # Follow prompts to enter username, password, email
   ```

6. **Build and publish**:
   ```bash
   npm run build
   npm publish
   ```

7. **Install in other projects**:
   ```bash
   npm install oss-fabric
   ```

## Example 3: Private Registry (Azure Artifacts)

### Prerequisites
- Azure DevOps organization
- Artifacts feed created

### Steps

1. **Switch to private mode**:
   ```bash
   npm run pkg:private
   ```

2. **Install Azure Artifacts credential provider**:
   ```bash
   npm install -g vsts-npm-auth
   ```

3. **Create `.npmrc` file**:
   ```
   registry=https://pkgs.dev.azure.com/your-org/_packaging/your-feed/npm/registry/
   ```

4. **Authenticate**:
   ```bash
   vsts-npm-auth -config .npmrc
   ```

5. **Build and publish**:
   ```bash
   npm run build
   npm publish
   ```

## Example 4: Scoped Package on Public Registry

### Prerequisites
- Organization or user scope on npm registry
- Scope configured in npm

### Steps

1. **Update package name** for your scope:
   ```bash
   # Edit scripts/package-mode.js
   # Change PUBLIC_CONFIG.name to '@yourscope/oss-fabric'
   ```

2. **Switch to public mode**:
   ```bash
   npm run pkg:public
   ```

3. **Verify scoped name**:
   ```bash
   npm run pkg:status
   # Should show your scoped name
   ```

4. **Login and publish**:
   ```bash
   npm login
   npm publish --access public
   ```

## Example 5: Development vs Production Publishing

### Development Publishing

1. **Update version for development**:
   ```bash
   npm version prerelease --preid=dev
   # Creates version like 2.3.0-dev.0
   ```

2. **Publish with dev tag**:
   ```bash
   npm run pkg:private  # or public
   npm run build
   npm publish --tag dev
   ```

3. **Install development version**:
   ```bash
   npm install @private/oss-fabric@dev
   ```

### Production Publishing

1. **Update version for production**:
   ```bash
   npm version patch  # or minor/major
   ```

2. **Publish as latest**:
   ```bash
   npm run pkg:private  # or public
   npm run build
   npm publish
   ```

## Example 6: Multi-Registry Setup

If you need to publish to both private and public registries:

### Setup

1. **Create registry-specific scripts** in package.json:
   ```json
   {
     "scripts": {
       "publish:private": "npm run pkg:private && npm run build && npm publish --registry=https://npm.pkg.your-git-host.com",
       "publish:public": "npm run pkg:public && npm run build && npm publish"
     }
   }
   ```

2. **Use specific commands**:
   ```bash
   # Publish to private registry
   npm run publish:private
   
   # Publish to public registry  
   npm run publish:public
   ```

## Example 7: Automated Publishing with CI/CD

### Create CI/CD pipeline configuration:

```yaml
# Example CI/CD pipeline configuration
name: Publish Package

# Configure triggers based on your CI/CD system
on:
  release:
    types: [published]

jobs:
  publish-private:
    runs-on: ubuntu-latest
    steps:
      # Checkout code
      - uses: actions/checkout@v3
      
      # Setup Node.js environment
      - uses: actions/setup-node@v3
        with:
          node-version: '22'
          registry-url: 'https://npm.pkg.your-git-host.com'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Switch to private mode
        run: npm run pkg:private
        
      - name: Build package
        run: npm run build
        
      - name: Publish to Private Registry
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.PRIVATE_REGISTRY_TOKEN }}

  publish-public:
    runs-on: ubuntu-latest
    # Configure condition based on your tagging strategy
    if: contains(event.release.tag_name, 'public')
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '22'
          registry-url: 'https://registry.npmjs.org'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Switch to public mode
        run: npm run pkg:public
        
      - name: Create LICENSE file
        run: cp LICENSE.template.md LICENSE
        
      - name: Build package
        run: npm run build
        
      - name: Publish to Public Registry
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.PUBLIC_REGISTRY_TOKEN }}
```

## Common Issues and Solutions

### Issue: 403 Forbidden when publishing

**Solution**: Check authentication and permissions:
```bash
npm whoami
npm config get registry
```

### Issue: Package name already exists

**Solution**: Use scoped package or different name:
```bash
npm view your-package-name  # Check if exists
npm run pkg:private        # Uses @private scope
```

### Issue: Build fails before publishing

**Solution**: Test build separately:
```bash
npm run build
npm run test:build
npm run pack:dry  # Check what will be published
```

### Issue: Wrong files included in package

**Solution**: Check package contents:
```bash
npm run pack:dry | head -20  # See what files are included
```

## Testing Your Package

Before publishing, always test your package:

```bash
# Build and pack
npm run build
npm run pack:dry

# Test in another project
cd ../test-project
npm install ../oss-fabric/package-name-2.3.0.tgz

# Test functionality
node -e "const pkg = require('package-name'); console.log(pkg.VersionManager)"
```

## Version Management Best Practices

1. **Use semantic versioning**: `major.minor.patch`
2. **Tag development versions**: `2.3.0-dev.0`
3. **Update version before publishing**:
   ```bash
   npm version patch    # Bug fixes
   npm version minor    # New features
   npm version major    # Breaking changes
   ```

4. **Create release notes** for significant versions
5. **Test thoroughly** before publishing to production

## Security Considerations

1. **Review code** before publishing publicly
2. **Check .npmignore** to exclude sensitive files
3. **Use npm audit** to check for vulnerabilities:
   ```bash
   npm audit
   npm audit fix
   ```

4. **Enable 2FA** on npm account for public packages
5. **Use specific versions** in production dependencies

---

For more detailed information, see [PACKAGE_MODES.md](PACKAGE_MODES.md) and [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md). 