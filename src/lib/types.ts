/**
 * Type definitions for OSS Fabric Framework
 */

import { Request, Response, NextFunction } from 'express';

export type DeprecationSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type VersionComparison = -1 | 0 | 1;

/**
 * Configuration options for OSS Fabric
 */
export interface OSSFabricConfig {
  /**
   * Enable or disable deprecation warnings
   * @default true
   */
  enableDeprecationWarnings?: boolean;

  /**
   * Suppress upgrade notifications in deprecation warnings
   * @default false
   */
  suppressUpgradeNotifications?: boolean;

  /**
   * Minimum severity level for showing deprecation warnings
   * @default 'LOW'
   */
  deprecationSeverityThreshold?: DeprecationSeverity;

  /**
   * Custom service configuration
   */
  service?: {
    name?: string;
    version?: string;
    port?: number;
  };

  /**
   * Development mode settings
   */
  development?: {
    enableDetailedLogging?: boolean;
    enableStackTraces?: boolean;
  };
}

/**
 * Package information structure
 */
export interface PackageInfo {
  name: string;
  version: string;
  description?: string;
  author?: string;
  license?: string;
  repository?: {
    type: string;
    url: string;
  };
  keywords?: string[];
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

/**
 * Deprecation rule configuration
 */
export interface DeprecationRule {
  versions: string;
  severity: DeprecationSeverity;
  message: string;
  emoji: string;
}

/**
 * Deprecation information returned by version manager
 */
export interface DeprecationInfo {
  isDeprecated: boolean;
  severity: DeprecationSeverity;
  message: string;
  emoji: string;
  currentVersion: string;
  targetVersion: string;
  upgradeRecommendation: string;
}

/**
 * Express route handler type
 */
export interface RouteHandler {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
  path: string;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middleware?: Array<(req: Request, res: Response, next: NextFunction) => void>;
}

/**
 * Middleware function type
 */
export interface Middleware {
  name: string;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  options?: Record<string, unknown>;
}

/**
 * Service status information
 */
export interface ServiceStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  version: string;
  uptime: number;
  timestamp: string;
  checks?: {
    [key: string]: {
      status: 'pass' | 'fail' | 'warn';
      message?: string;
      timestamp: string;
    };
  };
}

/**
 * API Response structure
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Array<{
    field?: string;
    message: string;
    code?: string;
  }>;
  timestamp: string;
  requestId?: string;
}

/**
 * Logging levels
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

/**
 * Logger interface
 */
export interface Logger {
  debug(message: string, meta?: Record<string, unknown>): void;
  info(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  error(message: string, meta?: Record<string, unknown>): void;
  fatal(message: string, meta?: Record<string, unknown>): void;
}
