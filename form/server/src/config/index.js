import { Sequelize } from 'sequelize';

// Initialize Sequelize with database connection
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+05:30',
});


export default sequelize;