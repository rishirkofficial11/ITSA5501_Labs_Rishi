const express = require('express');
const morgan = require('morgan');
const path = require('path');
const os = require('os');
const IORedis = require('ioredis');
const { Queue } = require('bullmq');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;
const REDIS_HOST = process.env.REDIS_HOST || 'redis';
const REDIS_PORT = Number(process.env.REDIS_PORT || 6379);

const connection = { host: REDIS_HOST, port: REDIS_PORT };
const redis = new IORedis(connection);
const queue = new Queue('tickets', { connection });

// Serve the simple web UI
app.use('/', express.static(path.join(__dirname, 'public')));

// Health & info
app.get('/health', async (_req, res) => {
  try {
    const hits = await redis.incr('api:hits');
    res.json({ ok: true, hostname: os.hostname(), hits });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

/**
 * POST /tickets
 * Body: { name, email, subject, description }
 * Returns: { ticketId }
 */
app.post('/tickets', async (req, res) => {
  const { name, email, subject, description } = req.body || {};
  if (!name || !email || !subject || !description) {
    return res.status(400).json({ error: 'name, email, subject, description are required' });
  }
  try {
    // Create job in the queue
    const job = await queue.add('newTicket', { name, email, subject, description });

    const now = Date.now();
    const key = `ticket:${job.id}`;
    // Store initial ticket record in Redis
    await redis.hset(key, {
      id: job.id,
      name,
      email,
      subject,
      description,
      status: 'pending',
      createdAt: now
    });
    // Keep a simple list of latest tickets
    await redis.lpush('tickets:list', job.id);
    await redis.ltrim('tickets:list', 0, 99); // keep last 100

    res.status(201).json({ ticketId: job.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * GET /tickets
 * Returns last N tickets (default 20)
 */
app.get('/tickets', async (req, res) => {
  const limit = Math.min(Number(req.query.limit || 20), 100);
  try {
    const ids = await redis.lrange('tickets:list', 0, limit - 1);
    if (ids.length === 0) return res.json([]);
    const pipeline = redis.pipeline();
    ids.forEach(id => pipeline.hgetall(`ticket:${id}`));
    const results = await pipeline.exec();
    const tickets = results.map(([err, data]) => (err ? null : data)).filter(Boolean);
    res.json(tickets);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * GET /tickets/:id
 * Returns a specific ticket
 */
app.get('/tickets/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const data = await redis.hgetall(`ticket:${id}`);
    if (!data || !data.id) return res.status(404).json({ error: 'Ticket not found' });
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * GET /metrics
 * Returns queue metrics
 */
app.get('/metrics', async (_req, res) => {
  try {
    const counts = await queue.getJobCounts('waiting', 'active', 'completed', 'failed', 'delayed');
    res.json(counts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Helpdesk API listening on port ${PORT}`);
});