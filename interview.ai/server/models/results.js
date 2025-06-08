export default (sequelize, DataTypes) => {
  const Result = sequelize.define('Result', {
    result_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    message_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    session_id: { type: DataTypes.INTEGER, allowNull: false },
    score: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
        min: 0,
        max: 10
    }
    },
    completion_time:  { type: DataTypes.TIME, allowNull: false }
  }, {
    tableName: 'results',
    timestamps: false
  });

Result.associate = (models) => {
  Result.belongsTo(models.ConversationHistory, { foreignKey: 'message_id' });
  Result.belongsTo(models.User, { foreignKey: 'user_id' }); 
  Result.hasOne(models.Feedback, { foreignKey: 'result_id' });
  Result.belongsTo(models.InterviewSession, {
      foreignKey: "session_id",
  });
};


  return Result;
};
