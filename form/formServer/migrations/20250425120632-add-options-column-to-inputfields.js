export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('inputfields', 'options', {
    type: Sequelize.JSON,
    allowNull: true,
  });
}

export async function down(queryInterface) {
  await queryInterface.removeColumn('inputfields', 'options');
}
