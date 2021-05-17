module.exports = {
    PORT: process.env.PORT || 8000,
    JWT_SECRET: 'secretkey',
    NODE_ENV: process.env.NODE_ENV || 'development',
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000', // https://concretti-application.vercel.app/
    DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgres://vccphtaoqwqcvc:3cad3a8d730a5fe09205c474d1aad32e4503cad8f4904ec047ddfdffc6bbf1fa@ec2-3-232-163-23.compute-1.amazonaws.com:5432/d410isepvle6gf",
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL || ''
}