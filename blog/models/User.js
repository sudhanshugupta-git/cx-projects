// models/user.js
export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    });
  
    User.associate = (models) => {
      // A user can have many blogs
      User.hasMany(models.Blog, {
        foreignKey: 'userId',
        as: 'blogs',
      });
    };
  
    return User;
  };
  