export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('interview_sessions', {
      session_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id',
        }
      },
      start_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      end_time: {
        type: Sequelize.TIME,
        allowNull: true,
        defaultValue: null,
      },
      status: {
        type: Sequelize.ENUM('ongoing', 'completed', 'canceled'),
        defaultValue: 'ongoing',
      },
    }, {
      timestamps: false
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('interview_sessions');
  },
};
