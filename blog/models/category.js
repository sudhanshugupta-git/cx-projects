
export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  // Category.associate = (models) => {
  //   Category.hasMany(models.Blog, { foreignKey: 'categoryId' });
  // };

  Category.associate = (models) => {
    Category.belongsToMany(models.Blog, {
      through: 'BlogCategories', // ✅ Junction table name
      foreignKey: 'categoryId',  // ✅ Foreign key in junction table referring to Category
      otherKey: 'blogId',         // ✅ Foreign key in junction table referring to Blog
    });
  };

  return Category;
};
