# React-Markdown Import Error Troubleshooting Guide

## Quick Fix

1. Install the package and its types:
```bash
# Using npm
npm install react-markdown @types/react-markdown

# Using yarn
yarn add react-markdown @types/react-markdown
```

2. Update package.json dependencies:
```json
{
  "dependencies": {
    "react-markdown": "^8.0.0"
  },
  "devDependencies": {
    "@types/react-markdown": "^8.0.0"
  }
}
```

## Verification Steps

1. Check Package Installation:
```bash
# npm
npm ls react-markdown

# yarn
yarn why react-markdown
```

2. Verify Import Syntax:
```typescript
// Correct import syntax
import ReactMarkdown from 'react-markdown'
// or
import Markdown from 'react-markdown'
```

3. Check TypeScript Configuration:
```json
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  }
}
```

## Common Issues & Solutions

1. Module Resolution:
```bash
# Clear dependency cache
npm cache clean --force
# or
yarn cache clean

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

2. Version Mismatch:
```bash
# Install specific version
npm install react-markdown@latest
# or
yarn add react-markdown@latest
```

3. Peer Dependencies:
```bash
# Install peer dependencies
npm install remark-gfm rehype-raw
# or
yarn add remark-gfm rehype-raw
```

## Additional Tips

- Ensure Vite is properly configured for markdown imports
- Check for conflicting markdown packages
- Verify React version compatibility
- Run TypeScript compiler in strict mode to catch issues

## Still Having Issues?

1. Try creating a minimal reproduction
2. Check GitHub issues for similar problems
3. Verify all peer dependencies are installed
4. Update to latest stable versions of all packages