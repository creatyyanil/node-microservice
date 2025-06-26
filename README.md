# OSS Fabric Framework

A minimal, flexible TypeScript framework skeleton for microservices with Node.js 22+ support.

## 📖 Documentation

- **[Developer Guide](DEVELOPER_GUIDE.md)** - Comprehensive guide with ESLint, Prettier, and detailed usage
- **[Quick Reference](QUICK_REFERENCE.md)** - Common commands and troubleshooting
- **[Changelog](CHANGELOG.md)** - Version history and updates
- **[Patterns](src/patterns/README.md)** - Microservice patterns and examples

## Features

- ✅ **TypeScript First**: Built with TypeScript for type safety
- ✅ **Version Management**: Automatic deprecation warnings and version tracking
- ✅ **Development Tools**: ESLint v9, Prettier, and TypeScript configured
- ✅ **Build System**: Webpack-based compilation with optimization
- ✅ **Node.js 22+**: Modern JavaScript features and performance
- ✅ **Microservice Patterns**: Ready-to-use TypeScript patterns
- ✅ **Minimal & Flexible**: Only what you need, extend as required
- ✅ **Zero Conflicts**: ESLint and Prettier work together seamlessly

## Quick Start

### Installation

```bash
npm install @private/oss-fabric
```

### Using Version Manager

```typescript
import { VersionManager } from '@private/oss-fabric';

const versionManager = new VersionManager();

// Get current version
console.log('Current version:', versionManager.current());

// Check for deprecation warnings
versionManager.checkDeprecation();

// Get package info
console.log('Package info:', versionManager.info());
```

### Using Microservice Patterns

Copy and customize the patterns from `src/patterns/`:

```typescript
// Copy src/patterns/basic-microservice.ts to your project
import { BasicMicroservice } from './basic-microservice';

const service = new BasicMicroservice({
  port: 3000,
  serviceName: 'my-service',
  version: '1.0.0'
});

service.start();
```

## Development Setup

### Prerequisites

- **Node.js**: 22.0.0 or higher
- **npm**: 10.0.0 or higher

### Quick Setup

```bash
# Clone and install
git clone <repository-url>
cd oss-fabric
npm install

# Verify everything works
npm run build
npm run lint
npm run format:check
```

### Code Quality Scripts

```bash
# ESLint (with success feedback)
npm run lint            # ✅ ESLint passed! All TypeScript files are clean.
npm run lint:debug      # Detailed debug information
npm run lint:fix        # Auto-fix issues

# Prettier
npm run format          # Format all files
npm run format:check    # Check formatting

# Combined
npm run precommit       # Run lint:fix + format
```

### ESLint & Prettier Configuration

✅ **No Conflicts**: ESLint and Prettier are configured to work together without conflicts.

- **ESLint v9**: Uses new flat config format (`eslint.config.js`)
- **Prettier Integration**: `eslint-config-prettier` prevents rule conflicts
- **TypeScript Support**: Full TypeScript linting with `@typescript-eslint`

**Verify no conflicts**:
```bash
npx eslint-config-prettier 'src/**/*.ts'
# Output: "No rules that are unnecessary or conflict with Prettier were found."
```

## Available Patterns

- **Basic Microservice**: Simple Express.js setup with health checks
- **API Service**: Structured REST API with controllers and validation

See **[Developer Guide](DEVELOPER_GUIDE.md)** for detailed pattern documentation and usage examples.

## Scripts Reference

```bash
# Development
npm run dev              # Run example service
npm start               # Run example service
npm run deprecation-test # Test deprecation warnings

# Building
npm run build           # Production build
npm run build:dev       # Development build
npm run build:types     # Generate TypeScript declarations

# Code Quality
npm run lint            # Run ESLint (shows success message)
npm run lint:debug      # ESLint with detailed debug info
npm run lint:quiet      # ESLint quietly (only shows errors)  
npm run lint:fix        # Auto-fix ESLint issues
npm run format          # Format with Prettier
npm run format:check    # Check if properly formatted
npm run precommit       # Run lint:fix + format
npm run type-check      # TypeScript type checking

# Testing
npm test               # Run test suite
npm run test:build     # Test build output
npm run pack:dry       # Check what files will be published to npm
npm run pack:check     # Quick summary of package contents
```

## Configuration

The framework supports various configuration options:

```typescript
import { VersionManager } from '@private/oss-fabric';

const versionManager = new VersionManager();

versionManager.checkDeprecation({
  enableDeprecationWarnings: true,
  suppressUpgradeNotifications: false,
  deprecationSeverityThreshold: 'LOW'
});
```

## TypeScript Support

Full TypeScript support with:
- Strict type checking enabled
- Path aliases support
- Declaration files included
- Source maps for debugging
- ESLint TypeScript integration

## Project Structure

```
oss-fabric/
├── src/                           # TypeScript source
│   ├── lib/                      # Core framework code
│   │   ├── types.ts              # Type definitions
│   │   ├── utils.ts              # Utility functions
│   │   └── version.ts            # Version management
│   ├── patterns/                 # Microservice patterns
│   │   ├── basic-microservice.ts
│   │   └── README.md
│   └── index.ts                  # Main entry point
├── dist/                         # Compiled JavaScript
├── eslint.config.js              # ESLint v9 configuration
├── .prettierrc                   # Prettier configuration
├── package.json
├── tsconfig.json
├── webpack.config.js
├── DEVELOPER_GUIDE.md            # 📖 Detailed documentation
└── README.md                     # This file
```

## Troubleshooting

### Common Issues

**ESLint not working?**
- Ensure `eslint.config.js` exists (not `.eslintrc.json`)
- Run `npm run lint:debug` to see what files are being processed

**Prettier conflicts?**
- Run `npx eslint-config-prettier 'src/**/*.ts'` to check for conflicts
- Use `npm run precommit` for the correct workflow

**Build issues?**
- Run `npm run type-check` to isolate TypeScript issues
- Check `tsconfig.json` and `webpack.config.js`

📖 **See [Developer Guide](DEVELOPER_GUIDE.md) for detailed troubleshooting and solutions.**

## Contributing

This is a private internal framework. For contributions:

1. **Read [Developer Guide](DEVELOPER_GUIDE.md)** for setup and standards
2. **Follow TypeScript best practices**
3. **Use `npm run precommit`** before submitting
4. **Maintain backward compatibility**
5. **Update documentation for changes**
6. **Add tests for new features**

## License

UNLICENSED - Private internal use only.

---

📖 **For detailed documentation, troubleshooting, and advanced usage, see [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)**
