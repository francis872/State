// ...existing code...
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import * as Sentry from '@sentry/node';
import routes from './routes';
import { errorHandler } from './middleware/error.middleware';

// Config
dotenv.config();

// Sentry v8 — init before everything
if (process.env.SENTRY_DSN_BACKEND) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN_BACKEND,
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: 1.0,
  });
}

const app = express();

// Raw body for Stripe webhook (must be before json() middleware)
app.use('/webhook/stripe', express.raw({ type: 'application/json' }));

const allowedOrigins = (process.env.CORS_ORIGIN || process.env.APP_URL || 'http://localhost:3000')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return cb(null, true);
    if (allowedOrigins.some(o => origin.startsWith(o))) return cb(null, true);
    cb(new Error(`CORS not allowed for origin: ${origin}`));
  },
  credentials: true,
}));
app.use(json());

// Rutas
app.use(routes);

// Sentry v8 error handler (before custom errorHandler)
Sentry.setupExpressErrorHandler(app);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`STATE OS backend corriendo en puerto ${PORT}`);
});
// ...existing code...
