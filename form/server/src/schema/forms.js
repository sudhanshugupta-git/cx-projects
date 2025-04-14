import { DataTypes } from 'sequelize';
import sequelize from "../config/index.js";

const Form = sequelize.define('Form', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    // created_at: {
    //     type: DataTypes.DATE,
    //     allowNull: false,
    //     defaultValue: sequelize.NOW,
    // },
    // updated_at: {
    //     type: DataTypes.DATE,
    //     allowNull: true,
    // },
}, {
    tableName: 'forms',
    timestamps: false,
});


// Sync the table
// (async () => {
//     try {
//         await Form.sync({ force: false }); // Creates the table if it doesn't exist
//         console.log('Forms table synchronized successfully!');
//     } catch (error) {
//         console.error('Error synchronizing InputField table:', error);
//     }
// })();

export default Form;  