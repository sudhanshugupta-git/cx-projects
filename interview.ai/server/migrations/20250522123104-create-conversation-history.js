export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("conversation_history", {
      message_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      session_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "interview_sessions",
          key: "session_id",
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        }
      },
      message_content: {
        type: Sequelize.TEXT,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("conversation_history");
  },
};
