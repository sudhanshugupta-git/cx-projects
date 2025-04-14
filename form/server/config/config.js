import dotenv from 'dotenv';
dotenv.config();
export default {
  "development": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
}
