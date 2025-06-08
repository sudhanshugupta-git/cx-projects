export default (sequelize, DataTypes) => {
  const InterviewSession = sequelize.define('InterviewSession', {
    session_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    start_time: { type: DataTypes.TIME, allowNull: false },
    end_time: { 
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: null,
      validate: {
        isAfter(value) {
          if (!value || !this.start_time) return;
          if (this.start_time && value <= this.start_time) {
            throw new Error('End time must be after start time');
          }
        }
      }
    },
    status: {
      type: DataTypes.ENUM('ongoing', 'completed', 'canceled'),
      defaultValue: 'ongoing'
    }
  }, {
    tableName: 'interview_sessions',
    timestamps: false
  });

  InterviewSession.associate = (models) => {
    InterviewSession.belongsTo(models.User, { foreignKey: 'user_id' });
    InterviewSession.hasMany(models.ConversationHistory, { foreignKey: 'session_id' });
    InterviewSession.hasMany(models.Result, { foreignKey: 'session_id' });
  };

  return InterviewSession;
};
