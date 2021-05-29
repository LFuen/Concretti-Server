module.exports = {
    PORT: process.env.PORT || 8000,
    JWT_SECRET: process.env.JWT_SECRET || 's3cr3tKey',
    NODE_ENV: process.env.NODE_ENV || 'development',
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000', // http://localhost:3000 / https://concretti.vercel.app
    DATABASE_URL: process.env.DATABASE_URL ||
    "postgres://lili@localhost/concretti",
}


// postgres://lili@localhost/concretti
// postgres://evkgjlqehkjzmn:fc0c115319adbd2334a3bf8baca2eeceac291bad61e0f89fea6ca07257f367b9@ec2-34-202-54-225.compute-1.amazonaws.com:5432/d8jqla0c3dh1qn