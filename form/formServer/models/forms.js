export default (sequelize, DataTypes) => {
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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    }, {
      tableName: 'forms',
      timestamps: true,
    });
  
    Form.associate = (models) => {
      Form.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
  
      Form.hasMany(models.InputField, {
        foreignKey: 'form_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
  
      Form.hasMany(models.Response, {
        foreignKey: 'form_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    };
  
    return Form;
  };
  