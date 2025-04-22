// to generate: npx sequelize-cli migration:generate --name create-blog-categories
export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BlogCategories', {
      blogId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Blogs',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BlogCategories');
  },
};
