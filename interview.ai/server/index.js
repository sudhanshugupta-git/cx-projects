import cors from 'cors';
import express from 'express';
import db from './models/index.js'
import router from './src/routers/index.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
  res.send("Welcome to PrepQuest Copilot API!");
});

app.use(process.env.URL, router);

const PORT = process.env.DB_PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
});