import { defineConfig } from '@prisma/internals';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export default defineConfig({
  migrations: {},
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
