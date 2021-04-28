module.exports = {
    PORT: process.env.PORT || 8000,
    JWT_SECRET: 'secretkey',
    NODE_ENV: process.env.NODE_ENV || 'development',
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://lili@localhost/concretti",
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    "postgresql://lili@localhost/concretti-test",
  }