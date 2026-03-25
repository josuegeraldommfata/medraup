import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'medraup',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '32080910',
});

async function createTables() {
  try {
    const client = await pool.connect();

    // Drop if exist (clean start)
    await client.query(`
      DROP TABLE IF EXISTS "PortfolioItem" CASCADE;
      DROP TABLE IF EXISTS "Service" CASCADE;
      DROP TABLE IF EXISTS "SiteConfig" CASCADE;
    `);

    // SiteConfig
    await client.query(`
      CREATE TABLE "SiteConfig" (
        id SERIAL PRIMARY KEY,
        logo_url TEXT,
        favicon_url TEXT,
        menu_items JSONB,
        hero JSONB,
        footer JSONB,
        contact JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Service
    await client.query(`
      CREATE TABLE "Service" (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        features JSONB NOT NULL,
        image TEXT,
        icon TEXT,
        "order" INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // PortfolioItem
    await client.query(`
      CREATE TABLE "PortfolioItem" (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        problem TEXT NOT NULL,
        solution JSONB NOT NULL,
        image TEXT,
        link TEXT,
        "order" INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ Tabelas criadas com sucesso!');
    client.release();
  } catch (err) {
    console.error('Erro:', err);
  } finally {
    await pool.end();
  }
}

createTables();

