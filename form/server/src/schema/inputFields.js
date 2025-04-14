import { DataTypes } from 'sequelize';
import sequelize from "../config/index.js";

const InputField = sequelize.define('InputField', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    form_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING, 
        // type: DataTypes.ENUM('short_answer', "checkbox"),
        allowNull: false,
    },
    question: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
    tableName: 'input_fields',
    timestamps: false,
});

// Sync the table
// (async () => {
//     try {
//         await InputField.sync({ force: false }); // Creates the table if it doesn't exist
//         console.log('InputField table synchronized successfully!');
//     } catch (error) {
//         console.error('Error synchronizing InputField table:', error);
//     }
// })();

export default InputField;