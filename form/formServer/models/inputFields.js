export default (sequelize, DataTypes) => {
    const InputField = sequelize.define('InputField', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      options: {
        type: DataTypes.JSON, 
        allowNull: true,
      },
      form_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'forms',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    }, {
      tableName: 'inputfields',
      timestamps: true,
    });
  
    InputField.associate = (models) => {
      InputField.belongsTo(models.Form, {
        foreignKey: 'form_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    };
  
    return InputField;
  };
  