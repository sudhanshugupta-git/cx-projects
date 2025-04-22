
export default (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE', // or 'RESTRICT' if you don't want to delete blogs when user is deleted
      onUpdate: 'CASCADE',
    },
    // categoryId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'Categories',
    //     key: 'id',
    //   },
    //   onDelete: 'RESTRICT',
    //   onUpdate: 'CASCADE',
    // },
  });

  // Blog.associate = (models) => {
  //   Blog.belongsTo(models.User, { foreignKey: 'userId' });
  //   Blog.belongsTo(models.Category, { foreignKey: 'categoryId' });
  // };

  Blog.associate = (models) => {
    Blog.belongsTo(models.User, { foreignKey: 'userId' });
    Blog.belongsToMany(models.Category, {
      through: 'BlogCategories',
      foreignKey: 'blogId',         // this model's FK in join table
      otherKey: 'categoryId',
    });
  };

  return Blog;
};
