# OSS Fabric Framework - Developer Guide

A comprehensive guide for developers working with the OSS Fabric Framework.

## Table of Contents

- [Overview](#overview)
- [Setup & Installation](#setup--installation)
- [Development Environment](#development-environment)
- [ESLint Configuration](#eslint-configuration)
- [Prettier Configuration](#prettier-configuration)
- [Library Usage](#library-usage)
- [Microservice Patterns](#microservice-patterns)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)
- [Contributing](#contributing)

## Overview

OSS Fabric is a minimal, flexible TypeScript framework skeleton designed for building microservices with Node.js 22+. It provides version management, development tools, and ready-to-use patterns while maintaining simplicity and flexibility.

### Key Features

- 🚀 **TypeScript First**: Full TypeScript support with strict type checking
- 📦 **Version Management**: Automatic deprecation warnings and version tracking
- 🛠️ **Development Tools**: Pre-configured ESLint, Prettier, and TypeScript
- 🏗️ **Build System**: Webpack-based compilation with optimization
- 🔧 **Node.js 22+**: Modern JavaScript features and performance
- 🎯 **Microservice Patterns**: Ready-to-use, customizable patterns
- 📐 **Minimal & Flexible**: Only essential features, easily extensible

## Setup & Installation

### Prerequisites

- **Node.js**: 22.0.0 or higher
- **npm**: 10.0.0 or higher
- **TypeScript**: 5.5.0 or higher (included in dev dependencies)

### Installation

```bash
# Install the framework
npm install @private/oss-fabric

# For development (clone the repository)
git clone <repository-url>
cd oss-fabric
npm install
```

### Verify Installation

```bash
# Check if everything is working
npm run build
npm test
npm run lint
```

## Development Environment

### Required Tools

The framework comes pre-configured with essential development tools:

1. **TypeScript**: Static type checking
2. **ESLint**: Code quality and style checking
3. **Prettier**: Code formatting
4. **Webpack**: Bundling and optimization

### Available Scripts

```bash
# Development
npm run dev              # Run example service with hot reload
npm start               # Run example service
npm run deprecation-test # Test deprecation warnings

# Building
npm run build           # Production build
npm run build:dev       # Development build
npm run build:types     # Generate TypeScript declarations

# Code Quality
npm run lint            # Run ESLint (shows success message)
npm run lint:debug      # Run ESLint with detailed debug info
npm run lint:quiet      # Run ESLint quietly (only shows errors)
npm run lint:fix        # Auto-fix ESLint issues
npm run format          # Format code with Prettier
npm run format:check    # Check if code is properly formatted
npm run precommit       # Run both lint:fix and format
npm run type-check      # TypeScript type checking without compilation

# Testing
npm test               # Run test suite
npm run test:build     # Test build output
npm run pack:dry      # Check what files will be published to npm
npm run pack:check    # Quick summary of package contents
```

## ESLint Configuration

### Overview

ESLint is configured with TypeScript support and Prettier integration to ensure code quality without formatting conflicts.

### Configuration Files

- **`eslint.config.js`**: Main ESLint configuration (ESLint v9 flat config format)
- **No `.eslintrc.json`**: We use the new flat config format
- **No `.eslintignore`**: Ignores are configured in `eslint.config.js`

### Current Rules

```javascript
// eslint.config.js
module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
        project: './tsconfig.json'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'off'
    }
  },
  prettier, // Disables conflicting rules
  {
    ignores: ['dist/', 'node_modules/', '*.js', 'webpack.config.js', 'scripts/']
  }
];
```

### Running ESLint

```bash
# Basic linting
npm run lint

# With detailed output
npm run lint:debug

# Auto-fix issues
npm run lint:fix

# Quiet mode (only errors)
npm run lint:quiet
```

### ESLint Output Examples

**Success:**
```bash
npm run lint
# ✅ ESLint passed! All TypeScript files are clean.
```

**With Issues:**
```bash
npm run lint
# src/lib/utils.ts
#   36:14  error  'error' is defined but never used  @typescript-eslint/no-unused-vars
# ✖ 1 problem (1 error, 0 warnings)
```

### Common ESLint Issues & Solutions

1. **Unused Variables**: Prefix with `_` (e.g., `_unusedParam`)
2. **Any Types**: Replace with specific types or `unknown`
3. **Function Types**: Use proper function signatures instead of `Function`

## Prettier Configuration

### Overview

Prettier handles code formatting automatically, ensuring consistent style across the codebase.

### Configuration

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### Ignored Files

```
// .prettierignore
dist/
node_modules/
*.json
*.md
```

### Running Prettier

```bash
# Format all files
npm run format

# Check formatting
npm run format:check

# Combined workflow
npm run precommit  # Runs lint:fix + format
```

### ESLint + Prettier Integration

The configuration includes `eslint-config-prettier` to prevent conflicts:

```bash
# Check for conflicts
npx eslint-config-prettier 'src/**/*.ts'
# Output: "No rules that are unnecessary or conflict with Prettier were found."
```

## Library Usage

### Core Components

#### 1. Version Manager

```typescript
import { VersionManager } from '@private/oss-fabric';

const versionManager = new VersionManager();

// Get current version
const version = versionManager.current();
console.log('Current version:', version); // "2.3.0"

// Get detailed package information
const info = versionManager.info();
console.log('Package info:', info);

// Check for deprecation warnings
versionManager.checkDeprecation();

// Compare versions
const comparison = versionManager.compare('2.2.0', '2.3.0');
console.log('Comparison:', comparison); // -1 (first is older)
```

#### 2. Utility Functions

```typescript
import { 
  getPackageInfo, 
  formatTimestamp, 
  generateRequestId,
  validateRequiredFields,
  deepMerge 
} from '@private/oss-fabric';

// Get package information
const packageInfo = getPackageInfo();

// Generate unique request ID
const requestId = generateRequestId();

// Validate required fields
const validation = validateRequiredFields(
  { name: 'John', email: '' },
  ['name', 'email']
);
console.log(validation); // { isValid: false, missingFields: ['email'] }

// Deep merge objects
const merged = deepMerge(
  { a: 1, b: { c: 2 } },
  { b: { d: 3 } }
);
console.log(merged); // { a: 1, b: { c: 2, d: 3 } }
```

#### 3. Type Definitions

```typescript
import { 
  ApiResponse, 
  ServiceStatus, 
  OSSFabricConfig,
  Logger 
} from '@private/oss-fabric';

// Use typed responses
const response: ApiResponse<{ message: string }> = {
  success: true,
  data: { message: 'Hello World' },
  timestamp: new Date().toISOString()
};

// Service status
const status: ServiceStatus = {
  status: 'healthy',
  version: '1.0.0',
  uptime: process.uptime(),
  timestamp: new Date().toISOString()
};
```

## Microservice Patterns

### Basic Microservice Pattern

```typescript
import { BasicMicroservice } from '@private/oss-fabric/patterns/basic-microservice';

// Create and configure service
const service = new BasicMicroservice({
  port: 3000,
  serviceName: 'my-awesome-service',
  version: '1.0.0'
});

// Start the service
service.start();

// Access Express app for custom routes
const app = service.getApp();
app.get('/custom', (req, res) => {
  res.json({ message: 'Custom endpoint' });
});
```

### Available Endpoints

When using `BasicMicroservice`, you get these endpoints automatically:

```bash
# Health check
GET /health
# Response: { success: true, data: { service, version, framework, status, uptime } }

# Version info
GET /version
# Response: { success: true, data: { service, framework } }

# Sample API
GET /api/hello
# Response: { success: true, data: { message, service } }
```

### Custom Microservice Pattern

```typescript
import express from 'express';
import { VersionManager, ApiResponse } from '@private/oss-fabric';

class CustomMicroservice {
  private app = express();
  private version = new VersionManager();

  constructor(private port: number) {
    this.setupRoutes();
  }

  private setupRoutes() {
    this.app.get('/api/data', (req, res) => {
      const response: ApiResponse = {
        success: true,
        data: { items: [] },
        timestamp: new Date().toISOString()
      };
      res.json(response);
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Service running on port ${this.port}`);
      this.version.checkDeprecation();
    });
  }
}
```

## API Reference

### VersionManager Class

```typescript
class VersionManager {
  // Get current version string
  current(): string;
  
  // Get detailed package information
  info(): PackageInfo;
  
  // Check for deprecation warnings
  checkDeprecation(config?: OSSFabricConfig): DeprecationInfo | null;
  
  // Compare two version strings
  compare(version1: string, version2: string): VersionComparison;
  
  // Check if version is deprecated
  isDeprecated(version: string): boolean;
}
```

### Utility Functions

```typescript
// Package information
function getPackageInfo(): PackageInfo;

// Timestamp formatting
function formatTimestamp(date?: Date): string;

// Request ID generation
function generateRequestId(): string;

// JSON parsing with fallback
function safeJsonParse<T>(jsonString: string, fallback: T): T;

// Email validation
function isValidEmail(email: string): boolean;

// Field validation
function validateRequiredFields<T>(
  obj: T, 
  requiredFields: (keyof T)[]
): { isValid: boolean; missingFields: string[] };

// Deep object merging
function deepMerge<T>(target: T, source: Partial<T>): T;

// Logging sanitization
function sanitizeForLogging(str: string): string;
```

## Troubleshooting

### Common Issues & Solutions

#### 1. ESLint Issues

**Problem**: ESLint not finding configuration
```bash
# Error: ESLint couldn't find an eslint.config.js file
```
**Solution**: Ensure `eslint.config.js` exists in project root

**Problem**: TypeScript parsing errors
```bash
# Error: Parsing error: Cannot read file 'tsconfig.json'
```
**Solution**: Verify `tsconfig.json` exists and is valid

#### 2. Prettier Conflicts

**Problem**: ESLint and Prettier fighting over formatting
**Solution**: Ensure `eslint-config-prettier` is installed and configured

```bash
# Check for conflicts
npx eslint-config-prettier 'src/**/*.ts'
```

#### 3. TypeScript Issues

**Problem**: Type errors in compiled output
**Solution**: Run type checking separately

```bash
npm run type-check
```

#### 4. Build Issues

**Problem**: Webpack compilation errors
**Solution**: Check webpack configuration and TypeScript setup

```bash
# Clean build
npm run build:dev
```

### Performance Tips

1. **Use TypeScript strict mode** for better type safety
2. **Run lint:fix before format** to avoid conflicts
3. **Use the precommit script** for consistency
4. **Enable ESLint in your IDE** for real-time feedback

## Best Practices

### Code Quality

1. **Use TypeScript strictly**: Enable all strict options
2. **Follow naming conventions**: Use camelCase for variables, PascalCase for classes
3. **Write meaningful comments**: Especially for complex business logic
4. **Use proper error handling**: Always handle promises and async operations

### Development Workflow

```bash
# Recommended workflow
npm run lint          # Check for issues
npm run type-check    # Verify types
npm run format        # Format code
npm run build         # Build project
npm run test          # Run tests
```

### Git Hooks

Consider adding these to your `.git/hooks/pre-commit`:

```bash
#!/bin/sh
npm run precommit
```

### VS Code Settings

Recommended `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["typescript"],
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## Contributing

### Development Setup

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Verify setup**: `npm run build && npm test`
4. **Run linting**: `npm run lint`

### Code Standards

- Follow existing code patterns
- Maintain TypeScript strict mode compliance
- Add tests for new features
- Update documentation for changes
- Use semantic versioning for releases

### Pull Request Process

1. **Create feature branch**: `git checkout -b feature/new-feature`
2. **Make changes**: Follow code standards
3. **Run quality checks**: `npm run precommit`
4. **Write tests**: Cover new functionality
5. **Update docs**: Keep documentation current
6. **Submit PR**: Include description and testing notes

### Release Process

1. **Update version**: `npm version [patch|minor|major]`
2. **Update CHANGELOG.md**: Document changes
3. **Run full test suite**: `npm test`
4. **Build and verify**: `npm run build`
5. **Publish**: `npm publish`

---

## Support

For issues, questions, or contributions:

1. **Check this guide** for common solutions
2. **Review existing issues** in the repository
3. **Create detailed bug reports** with reproduction steps
4. **Follow contribution guidelines** for PRs

**Happy coding!** 🚀 