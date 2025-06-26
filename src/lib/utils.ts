import * as fs from 'fs';
import * as path from 'path';
import { PackageInfo } from './types';

/**
 * Utility functions for OSS Fabric Framework
 */

/**
 * Get package information from package.json
 */
export function getPackageInfo(): PackageInfo {
  const possiblePaths = [
    path.join(__dirname, '../../package.json'),
    path.join(__dirname, '../../../package.json'),
    path.join(process.cwd(), 'package.json'),
    path.join(process.cwd(), 'node_modules/@private/oss-fabric/package.json'),
  ];

  for (const packagePath of possiblePaths) {
    try {
      if (fs.existsSync(packagePath)) {
        const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        return {
          name: packageJson.name || 'unknown',
          version: packageJson.version || '0.0.0',
          description: packageJson.description,
          author: packageJson.author,
          license: packageJson.license,
          repository: packageJson.repository,
          keywords: packageJson.keywords,
          dependencies: packageJson.dependencies,
          devDependencies: packageJson.devDependencies,
        };
      }
    } catch {
      // Continue to next path if this one fails
      continue;
    }
  }

  // Fallback if no package.json found
  return {
    name: '@private/oss-fabric',
    version: '2.3.0',
    description: 'A minimal, flexible TypeScript framework skeleton for microservices',
  };
}

/**
 * Format timestamp to ISO string
 */
export function formatTimestamp(date: Date = new Date()): string {
  return date.toISOString();
}

/**
 * Generate a unique request ID
 */
export function generateRequestId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Safe JSON parse with fallback
 */
export function safeJsonParse<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString);
  } catch {
    return fallback;
  }
}

/**
 * Check if a value is a valid email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate required fields in an object
 */
export function validateRequiredFields<T extends Record<string, unknown>>(
  obj: T,
  requiredFields: (keyof T)[]
): { isValid: boolean; missingFields: string[] } {
  const missingFields: string[] = [];

  for (const field of requiredFields) {
    if (obj[field] === undefined || obj[field] === null || obj[field] === '') {
      missingFields.push(String(field));
    }
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
}

/**
 * Deep merge two objects
 */
export function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
  const result = { ...target };

  for (const key in source) {
    if (source[key] !== undefined) {
      if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
        result[key] = deepMerge(
          result[key] || ({} as Record<string, unknown>),
          source[key]
        ) as T[Extract<keyof T, string>];
      } else {
        result[key] = source[key] as T[Extract<keyof T, string>];
      }
    }
  }

  return result;
}

/**
 * Sanitize string for logging (remove sensitive data)
 */
export function sanitizeForLogging(str: string): string {
  return str
    .replace(/password["\s]*[:=]["\s]*[^"\s,}]+/gi, 'password="***"')
    .replace(/token["\s]*[:=]["\s]*[^"\s,}]+/gi, 'token="***"')
    .replace(/secret["\s]*[:=]["\s]*[^"\s,}]+/gi, 'secret="***"')
    .replace(/key["\s]*[:=]["\s]*[^"\s,}]+/gi, 'key="***"');
}
