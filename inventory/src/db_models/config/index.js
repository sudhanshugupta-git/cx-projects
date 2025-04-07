// documentation: https://sequelize.org/docs/v6/

import { Sequelize } from 'sequelize';


// Initialize Sequelize with database connection
const sequelize = new Sequelize('eCartProducts', 'root', '#Aradhya@Sudha0182', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+05:30', // Set to your local timezone (IST in this case)
});


export default sequelize;