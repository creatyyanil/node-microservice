# OSS Fabric - Quick Reference

Quick reference for common tasks and troubleshooting.

## 🚀 Quick Commands

### Setup
```bash
npm install                    # Install dependencies
npm run build                  # Build project
npm run lint                   # Check code quality
```

### Development
```bash
npm start                      # Run example service
npm run dev                    # Run with hot reload
npm run precommit              # Lint + Format (recommended before commits)
```

### Code Quality
```bash
npm run lint                   # ✅ ESLint passed! All TypeScript files are clean.
npm run lint:fix               # Auto-fix ESLint issues
npm run format                 # Format with Prettier
npm run format:check           # Check formatting
```

### Debug & Troubleshooting
```bash
npm run lint:debug             # Detailed ESLint information
npm run type-check             # TypeScript type checking only
npm run test:build             # Test build output
```

## 🔧 ESLint & Prettier

### No Conflicts Configuration ✅
- **ESLint v9**: Uses `eslint.config.js` (flat config)
- **Prettier Integration**: `eslint-config-prettier` prevents conflicts
- **TypeScript Support**: Full `@typescript-eslint` integration

### Verify Configuration
```bash
npx eslint-config-prettier 'src/**/*.ts'
# Should output: "No rules that are unnecessary or conflict with Prettier were found."
```

### Common ESLint Fixes
- **Unused variables**: Prefix with `_` (e.g., `_unusedParam`)
- **Any types**: Replace with `unknown` or specific types
- **Function types**: Use `(req: Request, res: Response) => void` not `Function`

## 📚 Library Usage

### Version Manager
```typescript
import { VersionManager } from '@private/oss-fabric';

const vm = new VersionManager();
console.log(vm.current());           // "2.3.0"
vm.checkDeprecation();               // Check for warnings
```

### Utilities
```typescript
import { generateRequestId, validateRequiredFields } from '@private/oss-fabric';

const id = generateRequestId();      // Unique ID
const validation = validateRequiredFields(obj, ['name', 'email']);
```

### Basic Microservice
```typescript
import { BasicMicroservice } from './patterns/basic-microservice';

const service = new BasicMicroservice({
  port: 3000,
  serviceName: 'my-service',
  version: '1.0.0'
});

service.start();
```

## 🆘 Troubleshooting

### ESLint Issues
| Problem | Solution |
|---------|----------|
| "ESLint couldn't find eslint.config.js" | Ensure `eslint.config.js` exists (not `.eslintrc.json`) |
| "Cannot read file 'tsconfig.json'" | Verify `tsconfig.json` exists and is valid |
| "Parsing error" | Run `npm run type-check` to isolate TypeScript issues |

### Prettier Issues
| Problem | Solution |
|---------|----------|
| ESLint and Prettier conflicts | Run `npx eslint-config-prettier` to check |
| Formatting not applied | Use `npm run format` not `npm run format:check` |
| Mixed line endings | Set `"endOfLine": "lf"` in `.prettierrc` |

### Build Issues
| Problem | Solution |
|---------|----------|
| TypeScript compilation errors | Run `npm run type-check` |
| Webpack build failures | Check `webpack.config.js` configuration |
| Missing dependencies | Run `npm install` |

## 📋 Development Workflow

### Recommended Order
1. `npm run lint` - Check for issues
2. `npm run type-check` - Verify types
3. `npm run format` - Format code
4. `npm run build` - Build project
5. `npm run test` - Run tests

### Pre-commit Checklist
- [ ] `npm run precommit` (runs lint:fix + format)
- [ ] `npm run build` (no errors)
- [ ] `npm run test` (all tests pass)
- [ ] Update documentation if needed

## 🔗 Links

- **[Developer Guide](DEVELOPER_GUIDE.md)** - Comprehensive documentation
- **[README](README.md)** - Project overview
- **[Changelog](CHANGELOG.md)** - Version history
- **[Patterns](src/patterns/README.md)** - Microservice patterns

## 💡 Pro Tips

1. **Use VS Code extensions**: ESLint, Prettier, TypeScript Hero
2. **Enable format on save**: Automatic code formatting
3. **Use `npm run precommit`**: Ensures clean commits
4. **Check debug output**: `npm run lint:debug` shows processed files
5. **TypeScript strict mode**: Enabled for better type safety

---

🚀 **Happy coding!** For detailed documentation, see [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) 