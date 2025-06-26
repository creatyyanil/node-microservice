import * as semver from 'semver';
import {
  DeprecationRule,
  DeprecationInfo,
  DeprecationSeverity,
  PackageInfo,
  VersionComparison,
  OSSFabricConfig,
} from './types';
import { getPackageInfo } from './utils';

/**
 * Version Manager for handling deprecation warnings and version comparisons
 */
export class VersionManager {
  private packageInfo: PackageInfo;
  private deprecationRules: DeprecationRule[];

  constructor() {
    this.packageInfo = getPackageInfo();
    this.deprecationRules = [
      {
        versions: '<2.0.0',
        severity: 'CRITICAL',
        message: 'Contains security vulnerabilities. Immediate upgrade required.',
        emoji: '🚨',
      },
      {
        versions: '>=2.0.0 <2.1.0',
        severity: 'HIGH',
        message: 'Missing security enhancements and performance improvements.',
        emoji: '⚠️',
      },
      {
        versions: '>=2.1.0 <2.2.0',
        severity: 'MEDIUM',
        message: 'Missing deprecation warning features and build optimizations.',
        emoji: '📢',
      },
      {
        versions: '>=2.2.0 <2.3.0',
        severity: 'LOW',
        message: 'Missing TypeScript support and Node.js 22+ features.',
        emoji: 'ℹ️',
      },
    ];
  }

  /**
   * Get current package version
   */
  public current(): string {
    return this.packageInfo.version;
  }

  /**
   * Get package information
   */
  public info(): PackageInfo {
    return { ...this.packageInfo };
  }

  /**
   * Check if a version is deprecated
   */
  public isDeprecated(version?: string): boolean {
    const targetVersion = version || this.current();
    return this.deprecationRules.some(rule => semver.satisfies(targetVersion, rule.versions));
  }

  /**
   * Get deprecation information for a version
   */
  public getDeprecationInfo(version?: string): DeprecationInfo | null {
    const targetVersion = version || this.current();
    const rule = this.deprecationRules.find(r => semver.satisfies(targetVersion, r.versions));

    if (!rule) {
      return null;
    }

    return {
      isDeprecated: true,
      severity: rule.severity,
      message: rule.message,
      emoji: rule.emoji,
      currentVersion: targetVersion,
      targetVersion: this.current(),
      upgradeRecommendation: `Upgrade to version ${this.current()} or later`,
    };
  }

  /**
   * Compare two versions
   */
  public compare(version1: string, version2: string): VersionComparison {
    const result = semver.compare(version1, version2);
    return result as VersionComparison;
  }

  /**
   * Check if there's an upgrade available
   */
  public hasUpgrade(version: string): boolean {
    return semver.gt(this.current(), version);
  }

  /**
   * Check deprecation with configuration options
   */
  public checkDeprecation(config: Partial<OSSFabricConfig> = {}): void {
    const {
      enableDeprecationWarnings = true,
      suppressUpgradeNotifications = false,
      deprecationSeverityThreshold = 'LOW',
    } = config;

    if (!enableDeprecationWarnings) {
      return;
    }

    const deprecationInfo = this.getDeprecationInfo();
    if (!deprecationInfo) {
      return;
    }

    const severityLevels: Record<DeprecationSeverity, number> = {
      LOW: 1,
      MEDIUM: 2,
      HIGH: 3,
      CRITICAL: 4,
    };

    const currentSeverityLevel = severityLevels[deprecationInfo.severity];
    const thresholdLevel = severityLevels[deprecationSeverityThreshold];

    if (currentSeverityLevel >= thresholdLevel) {
      this.displayDeprecationWarning(deprecationInfo, suppressUpgradeNotifications);
    }
  }

  /**
   * Display formatted deprecation warning
   */
  public displayDeprecationWarning(
    info: DeprecationInfo,
    suppressUpgradeNotifications: boolean = false
  ): void {
    const border = '='.repeat(80);
    const emoji = info.emoji;
    const severity = info.severity;

    console.log(`\n${border}`);
    console.log(`${emoji} OSS FABRIC DEPRECATION WARNING - ${severity} PRIORITY ${emoji}`);
    console.log(border);
    console.log(`Version: ${info.currentVersion}`);
    console.log(`Issue: ${info.message}`);

    if (!suppressUpgradeNotifications) {
      console.log(`Action: ${info.upgradeRecommendation}`);
    }

    console.log(`Severity: ${severity}`);
    console.log(border);
    console.log('This warning can be configured in your service initialization.');
    console.log(`${border}\n`);
  }
}
