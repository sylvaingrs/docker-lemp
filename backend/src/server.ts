import app, { apiUrl, dbConfig, initDatabase, pool } from './app';

export const PORT = process.env.PORT || 3000;

async function startServer() {
  await initDatabase(dbConfig);
  if (!pool) {
    return;
  }
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Can access on: ${apiUrl}`);
  });
}

startServer();
