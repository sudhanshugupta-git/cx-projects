import dotenv from 'dotenv';
import express from 'express';
import db from './models/index.js';
import router from './src/routes/index.js';

dotenv.config();
const app = express();
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Welcome to blog API");
});

app.use(process.env.URL, router);

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
