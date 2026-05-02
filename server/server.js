import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from './db.js';
import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

app.use(cors());
app.use(express.json());

// --- SEED ADMIN (If not exists) ---
const seedAdmin = () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123';
  const hash = bcrypt.hashSync(adminPass, 10);
  
  const existing = db.prepare('SELECT * FROM admins WHERE email = ?').get(adminEmail);
  if (!existing) {
    db.prepare('INSERT INTO admins (email, password) VALUES (?, ?)').run(adminEmail, hash);
    console.log(`Admin account created: ${adminEmail} / ${adminPass}`);
  } else {
    // Update password to match .env in case it was changed
    db.prepare('UPDATE admins SET password = ? WHERE email = ?').run(hash, adminEmail);
    console.log(`Admin password synced with .env for: ${adminEmail}`);
  }
};
seedAdmin();

// --- TRACK VISIT ---
app.post('/api/track', (req, res) => {
  const { userAgent, language, referrer, screenResolution, page } = req.body;
  try {
    db.prepare(`
      INSERT INTO visits (userAgent, language, referrer, screenResolution, page)
      VALUES (?, ?, ?, ?, ?)
    `).run(userAgent, language, referrer, screenResolution, page);
    
    console.log(`[TELEMETRY] New visit recorded from ${referrer} on page ${page}`);
    res.status(200).json({ message: 'Visit logged' });
  } catch (err) {
    console.error('[ERROR] Tracking failed:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// --- LOGIN ---
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM admins WHERE email = ?').get(email);
  
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// --- GET VISITS (Protected) ---
app.get('/api/visits', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, JWT_SECRET);
    const visits = db.prepare('SELECT * FROM visits ORDER BY timestamp DESC LIMIT 100').all();
    res.json(visits);
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// --- STATS (Protected) ---
app.get('/api/stats', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, JWT_SECRET);
    const total = db.prepare('SELECT COUNT(*) as count FROM visits').get().count;
    const today = db.prepare("SELECT COUNT(*) as count FROM visits WHERE date(timestamp) = date('now')").get().count;
    
    // Visits by day (last 7 days)
    const visitsByDay = db.prepare(`
      SELECT date(timestamp) as date, COUNT(*) as count 
      FROM visits 
      WHERE timestamp > date('now', '-7 days')
      GROUP BY date(timestamp)
      ORDER BY date ASC
    `).all();

    // Top referrers
    const topReferrers = db.prepare(`
      SELECT referrer, COUNT(*) as count 
      FROM visits 
      GROUP BY referrer 
      ORDER BY count DESC 
      LIMIT 5
    `).all();

    // Device breakdown
    const devices = db.prepare(`
      SELECT 
        CASE 
          WHEN userAgent LIKE '%Mobile%' THEN 'Mobile'
          WHEN userAgent LIKE '%Tablet%' THEN 'Tablet'
          ELSE 'Desktop'
        END as device,
        COUNT(*) as count
      FROM visits
      GROUP BY device
    `).all();

    res.json({ total, today, unique: total, visitsByDay, topReferrers, devices });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
