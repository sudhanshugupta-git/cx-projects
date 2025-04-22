export default (sequelize, DataTypes) => {
    const Response = sequelize.define('Response', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      answer: {
        type: DataTypes.TEXT,
        allowNull: false,
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
      tableName: 'responses',
      timestamps: true,
    });
  
    Response.associate = (models) => {
      Response.belongsTo(models.Form, {
        foreignKey: 'form_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    };
  
    return Response;
  };
  