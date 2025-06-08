export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('feedback', {
      feedback_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id',
        }
      },
      result_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'results',
          key: 'result_id',
        }
      },
      comments: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('feedback');
  },
};