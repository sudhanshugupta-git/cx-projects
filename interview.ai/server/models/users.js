export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'users',
    timestamps: true
  });

User.associate = (models) => {
  User.hasMany(models.InterviewSession, { foreignKey: 'user_id' });
  User.hasMany(models.ConversationHistory, { foreignKey: 'user_id' }); 
  User.hasMany(models.Result, { foreignKey: 'user_id' });            
  User.hasMany(models.Feedback, { foreignKey: 'user_id' });      
};

  return User;
};