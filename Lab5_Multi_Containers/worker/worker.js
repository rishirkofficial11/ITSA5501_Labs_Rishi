const { Worker, QueueEvents } = require('bullmq');
const IORedis = require('ioredis');

const REDIS_HOST = process.env.REDIS_HOST || 'redis';
const REDIS_PORT = Number(process.env.REDIS_PORT || 6379);
const WORKER_CONCURRENCY = Number(process.env.WORKER_CONCURRENCY || 5);

const connection = { host: REDIS_HOST, port: REDIS_PORT };
const redis = new IORedis(connection);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const jobWorker = new Worker(
  'tickets',
  async (job) => {
    const { name, email, subject, description } = job.data;

    // Simulate time to "resolve" the ticket
    await sleep(500 + Math.random() * 10000);

    // Simulate occasional failures (for demo)
    if (Math.random() < 0.05) {
      throw new Error('Intermittent processing error');
    }

    const resolution = `Hello ${name}, your issue "${subject}" has been reviewed. ` +
      `Suggested action: Please try turning it off and on again. If the problem persists, ` +
      `we'll escalate. (Auto-response for demo)`;

    // Update Redis ticket record
    const key = `ticket:${job.id}`;
    await redis.hset(key, {
      status: 'resolved',
      resolution,
      resolvedAt: Date.now()
    });

    return { ok: true };
  },
  { connection, concurrency: WORKER_CONCURRENCY }
);

const events = new QueueEvents('tickets', { connection });

events.on('completed', ({ jobId }) => {
  console.log(`[worker] ticket ${jobId} resolved`);
});

events.on('failed', async ({ jobId, failedReason }) => {
  console.log(`[worker] ticket ${jobId} failed: ${failedReason}`);
  // Persist failure status
  const key = `ticket:${jobId}`;
  await redis.hset(key, { status: 'failed', failedReason, resolvedAt: Date.now() });
});

jobWorker.on('ready', () => console.log('[worker] ready'));
jobWorker.on('error', (err) => console.error('[worker] error', err));

process.on('SIGTERM', async () => {
  console.log('SIGTERM: closing worker...');
  await jobWorker.close();
  await events.close();
  await redis.quit();
  process.exit(0);
});