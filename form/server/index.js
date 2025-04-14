import express from 'express';
import cors from 'cors';
import sequelize from './src/config/index.js';
import formRouter from './src/routers/formRouter.js';
import setupAssociations from './src/schema/association.js';

const app = express();
setupAssociations();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Welcome to form API");
});

// app.use('/api/forms', formRouter);
app.use(process.env.URL, formRouter);

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  console.log(`Server running at http://localhost:${PORT}`);
});
