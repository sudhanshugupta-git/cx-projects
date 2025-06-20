import dotenv from 'dotenv';
dotenv.config();

export default{
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": process.env.DB_HOST || '127.0.0.1',
    "dialect": process.env.DB_DIALECT
  }
}