'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Translation', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      value: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
    await queryInterface.addIndex('Translation', ['id']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Translation');
  }
};
