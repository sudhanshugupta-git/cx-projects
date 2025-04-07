// documentation: https://sequelize.org/docs/v6/

import { Sequelize } from 'sequelize';

console.log(process.env.DB_USERNAME)

// Initialize Sequelize with database connection
// const sequelize = new Sequelize('eCartProducts', 'root', 'mydbpass', {
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+05:30', // Set to your local timezone (IST in this case)
});


export default sequelize;