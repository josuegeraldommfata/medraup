import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'medraup',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '32080910',
});

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// GET /api/site
app.get('/api/site', async (req, res) => {
  try {
    const configRes = await pool.query('SELECT * FROM "SiteConfig" WHERE id = 1');
    const servicesRes = await pool.query('SELECT * FROM "Service" ORDER BY "order" ASC');
    const portfolioRes = await pool.query('SELECT * FROM "PortfolioItem" ORDER BY "order" ASC');

    res.json({
      config: configRes.rows[0] || {},
      services: servicesRes.rows,
      portfolio: portfolioRes.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/site/config
app.post('/api/site/config', async (req, res) => {
  const { logo_url, favicon_url, menu_items, hero, footer, contact } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO "SiteConfig" (id, logo_url, favicon_url, menu_items, hero, footer, contact, updated_at)
       VALUES (1, $1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
       ON CONFLICT (id) DO UPDATE SET
       logo_url = $1, favicon_url = $2, menu_items = $3, hero = $4, footer = $5, contact = $6, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [logo_url, favicon_url, menu_items, hero, footer, contact]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Services
app.get('/api/services', async (req, res) => {
  const result = await pool.query('SELECT * FROM "Service" ORDER BY "order" ASC');
  res.json(result.rows);
});
app.post('/api/services', async (req, res) => {
  const { id, title, description, features, image, icon, order } = req.body;
  const result = await pool.query(
    'INSERT INTO "Service" (id, title, description, features, image, icon, "order") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [id, title, description, features, image, icon, order]
  );
  res.json(result.rows[0]);
});
app.put('/api/services/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, features, image, icon, order } = req.body;
  const result = await pool.query(
    'UPDATE "Service" SET title = $1, description = $2, features = $3, image = $4, icon = $5, "order" = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
    [title, description, features, image, icon, order, id]
  );
  res.json(result.rows[0]);
});
app.delete('/api/services/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM "Service" WHERE id = $1', [id]);
  res.json({ success: true });
});

// Portfolio
app.get('/api/portfolio', async (req, res) => {
  const result = await pool.query('SELECT * FROM "PortfolioItem" ORDER BY "order" ASC');
  res.json(result.rows);
});
app.post('/api/portfolio', async (req, res) => {
  const { id, title, problem, solution, image, link, order } = req.body;
  const result = await pool.query(
    'INSERT INTO "PortfolioItem" (id, title, problem, solution, image, link, "order") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [id, title, problem, solution, image, link, order]
  );
  res.json(result.rows[0]);
});
app.put('/api/portfolio/:id', async (req, res) => {
  const { id } = req.params;
  const { title, problem, solution, image, link, order } = req.body;
  const result = await pool.query(
    'UPDATE "PortfolioItem" SET title = $1, problem = $2, solution = $3, image = $4, link = $5, "order" = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
    [title, problem, solution, image, link, order, id]
  );
  res.json(result.rows[0]);
});
app.delete('/api/portfolio/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM "PortfolioItem" WHERE id = $1', [id]);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend sem Prisma rodando em http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
  await pool.end();
  process.exit(0);
});

