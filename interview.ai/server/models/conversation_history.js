export default (sequelize, DataTypes) => {
  const ConversationHistory = sequelize.define(
    "ConversationHistory",
    {
      message_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      session_id: { type: DataTypes.INTEGER, allowNull: false },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      message_content: { type: DataTypes.TEXT },
    },
    {
      tableName: "conversation_history",
      timestamps: false,
    }
  );

  ConversationHistory.associate = (models) => {
    ConversationHistory.belongsTo(models.InterviewSession, {
      foreignKey: "session_id",
    });
    ConversationHistory.belongsTo(models.User, { foreignKey: "user_id" });
    ConversationHistory.hasOne(models.Result, { foreignKey: "message_id" });
  };

  return ConversationHistory;
};
