# License Templates for OSS Fabric

This file contains license templates for both private and public distribution modes.

## Private Distribution (UNLICENSED)

For private/internal use, no license file is needed. The package.json will show:
```json
{
  "license": "UNLICENSED",
  "private": true
}
```

## Public Distribution (MIT License)

For public distribution, create a `LICENSE` file with the following content:

```
MIT License

Copyright (c) 2025 [Your Name/Organization]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Instructions

1. **For Private Mode**: No additional license file needed
2. **For Public Mode**: Copy the MIT license text above into a `LICENSE` file (no extension)

## Switching Between Modes

Use the package mode switcher scripts:
- `npm run pkg:private` - Switch to private mode
- `npm run pkg:public` - Switch to public mode  
- `npm run pkg:status` - Check current mode 