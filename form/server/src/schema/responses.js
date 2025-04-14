import { DataTypes } from 'sequelize';
import sequelize from "../config/index.js";

// Define the Product model
const Response = sequelize.define('Response', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  form_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  question: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // created_at: {
  //   type: DataTypes.DATE,
  //   allowNull: false,
  //   defaultValue: sequelize.NOW,
  // },
  // updated_at: {
  //   type: DataTypes.DATE,
  //   allowNull: true,
  // },
}, {
  tableName: 'responses',
  timestamps: false,
});


// Sync the table
// (async () => {
//   try {
//       await Response.sync({ force: false }); // Creates the table if it doesn't exist
//       console.log('Responses table synchronized successfully!');
//   } catch (error) {
//       console.error('Error synchronizing InputField table:', error);
//   }
// })();

export default Response;  