/**
 * Basic Microservice Pattern
 *
 * A simple TypeScript microservice template with Express.js
 * Copy this file to start building your microservice
 */

import express, { Request, Response, NextFunction } from 'express';
import { VersionManager } from '../lib/version';

// Types for your microservice
interface ServiceConfig {
  port: number;
  serviceName: string;
  version: string;
}

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  timestamp: string;
}

// Basic microservice class
export class BasicMicroservice {
  private app: express.Application;
  private config: ServiceConfig;
  private versionManager: VersionManager;

  constructor(config: ServiceConfig) {
    this.app = express();
    this.config = config;
    this.versionManager = new VersionManager();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    // Basic middleware
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // CORS
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

    // Request logging
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
      next();
    });
  }

  private setupRoutes(): void {
    // Health check
    this.app.get('/health', (req: Request, res: Response) => {
      const response: ApiResponse = {
        success: true,
        data: {
          service: this.config.serviceName,
          version: this.config.version,
          framework: this.versionManager.current(),
          status: 'healthy',
          uptime: process.uptime(),
        },
        timestamp: new Date().toISOString(),
      };
      res.json(response);
    });

    // Version info
    this.app.get('/version', (req: Request, res: Response) => {
      const response: ApiResponse = {
        success: true,
        data: {
          service: this.config.version,
          framework: this.versionManager.info(),
        },
        timestamp: new Date().toISOString(),
      };
      res.json(response);
    });

    // Sample API endpoint
    this.app.get('/api/hello', (req: Request, res: Response) => {
      const response: ApiResponse = {
        success: true,
        data: {
          message: 'Hello from your microservice!',
          service: this.config.serviceName,
        },
        timestamp: new Date().toISOString(),
      };
      res.json(response);
    });

    // Error handling
    this.app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
      console.error('Error:', err.message);
      const response: ApiResponse = {
        success: false,
        message: 'Internal server error',
        timestamp: new Date().toISOString(),
      };
      res.status(500).json(response);
    });

    // 404 handler
    this.app.use((req: Request, res: Response) => {
      const response: ApiResponse = {
        success: false,
        message: 'Route not found',
        timestamp: new Date().toISOString(),
      };
      res.status(404).json(response);
    });
  }

  public start(): void {
    this.app.listen(this.config.port, () => {
      console.log(`🚀 ${this.config.serviceName} running on port ${this.config.port}`);
      console.log(`📊 Health check: http://localhost:${this.config.port}/health`);

      // Check for framework deprecation
      this.versionManager.checkDeprecation();
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}

// Usage example:
// const service = new BasicMicroservice({
//   port: 3000,
//   serviceName: 'my-microservice',
//   version: '1.0.0'
// });
// service.start();
