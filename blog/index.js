import dotenv from 'dotenv';
import express from 'express';
import db from './models/index.js';
import blogRouter from './src/routes/blog.routes.js';

dotenv.config();
const app = express();
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Welcome to blog API");
});

app.use(process.env.BLOG_URL, blogRouter);

const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
