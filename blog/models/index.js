import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize } from 'sequelize';
import configObj from '../config/config.js';  // import config

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';
const config = configObj[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);  // setup here

// const files = fs
//   .readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== path.basename(__filename) &&
//       file.slice(-3) === '.js'
//     );
//   });

// for (const file of files) {
//   const { default: modelDefiner } = await import(path.join(__dirname, file));
//   const model = modelDefiner(sequelize, Sequelize.DataTypes);
//   db[model.name] = model;
// }

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
