// import Form from './forms.js'
// import InputField from './inputFields.js';
// import Response from './responses.js';

// const setupAssociations = () => {
//     // Forms → InputFields (One-to-Many)
//     Form.hasMany(InputField, { foreignKey: 'form_id', as: 'inputFields' });
//     InputField.belongsTo(Form, { foreignKey: 'form_id', as: 'form' });

//     // Forms → Responses (One-to-Many)
//     Form.hasMany(Response, { foreignKey: 'form_id', as: 'responses' });
//     Response.belongsTo(Form, { foreignKey: 'form_id', as: 'form' });

//     // InputFields → Responses (One-to-Many through question) [sourceKey and targetKey are used when a non-id column (like question) is used for the association.}]
//     InputField.hasMany(Response, { foreignKey: 'question', sourceKey: 'question', as: 'responses' });
//     Response.belongsTo(InputField, { foreignKey: 'question', targetKey: 'question', as: 'inputField' });
// };

// export default setupAssociations;


import Form from './forms.js'
import InputField from './inputFields.js';
import Response from './responses.js';
import sequelize from '../config/index.js';

const setupAssociations = () => {
    // Forms → InputFields
    Form.hasMany(InputField, { foreignKey: 'form_id', as: 'inputFields', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    InputField.belongsTo(Form, { foreignKey: 'form_id', as: 'form', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

    // Forms → Responses
    Form.hasMany(Response, { foreignKey: 'form_id', as: 'responses', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Response.belongsTo(Form, { foreignKey: 'form_id', as: 'form', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

    // InputFields → Responses
    // InputField.hasMany(Response, { foreignKey: { name: 'question', length: 255 }, sourceKey: 'question', as: 'responses', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    // Response.belongsTo(InputField, { foreignKey: { name: 'question', length: 255 }, targetKey: 'question', as: 'inputField', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

};

(async () => {
    try {
        await sequelize.sync({ force: false }); // Sync models without recreating tables
        console.log('Database synchronized successfully with constraints!');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
})();

export default setupAssociations;
