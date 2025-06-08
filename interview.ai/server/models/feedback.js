export default (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    feedback_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    result_id: { type: DataTypes.INTEGER, allowNull: false },
    comments: DataTypes.TEXT
  }, {
    tableName: 'feedback',
    timestamps: false
  });

Feedback.associate = (models) => {
  Feedback.belongsTo(models.Result, { foreignKey: 'result_id' });
  Feedback.belongsTo(models.User, { foreignKey: 'user_id' }); 
};

  return Feedback;
};
