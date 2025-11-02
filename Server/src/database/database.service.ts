import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'skillmate',
      password: process.env.DB_PASSWORD || '123456789',
      port: Number(process.env.DB_PORT) || 5432,
    });
  }

  async onModuleInit() {
    try {
      await this.pool.connect();
      console.log('✅ Connected to PostgreSQL database');
    } catch (err) {
      console.error('❌ Failed to connect to PostgreSQL:', err);
      throw err;
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
    console.log('🛑 PostgreSQL connection closed');
  }

  async query(text: string, params?: any[]): Promise<QueryResult<any>> {
    try {
      const result = await this.pool.query(text, params);
      return result;
    } catch (err) {
      console.error('❌ Query error:', err);
      throw err;
    }
  }

  getPool(): Pool {
    return this.pool;
  }
}
