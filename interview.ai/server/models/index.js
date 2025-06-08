import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { Sequelize } from 'sequelize';
import configObj from '../config/config.js';

// Handle __filename and __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';
const config = configObj[env];
const db = {};

// Initialize Sequelize instance
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Dynamically import all model files in this directory (except index.js)
const files = fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== path.basename(__filename) &&
      file.slice(-3) === '.js'
    );
  });

for (const file of files) {
  const filePath = pathToFileURL(path.join(__dirname, file)).href; // Convert to file:// URL
  const { default: modelDefiner } = await import(filePath); // Dynamic import
  console.log(`Importing model from: ${file} =>`, typeof modelDefiner); 
  const model = modelDefiner(sequelize, Sequelize.DataTypes); // Initialize model (this'll call all model one by one)
  db[model.name] = model;
}

// Setup model associations if any
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
// export const { User, InterviewSession, ConversationHistory, Result, Feedback } = db;