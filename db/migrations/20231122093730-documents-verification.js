'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Company', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: "char(36)",
        allowNull: false,
        unique: true
      },
      isCompany: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        unique: false,
        defaultValue: false
      },
      status: {
        type: Sequelize.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        unique: false,
        defaultValue: 'pending'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      line: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },
      line: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
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

    await queryInterface.createTable('Person', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: false
      },
      userId: {
        type: "char(36)",
        allowNull: true,
        unique: false
      },
      share: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        default: 0
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

    await queryInterface.sequelize.query(`
      ALTER TABLE Person
      MODIFY COLUMN 
      userId char(36)
      CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci 
      NULL
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE Company
      MODIFY COLUMN 
      userId char(36)
      CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci 
      NULL
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE Person
      ADD CONSTRAINT fk_person_company_id
      FOREIGN KEY (companyId)
      REFERENCES Company (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE;
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE Person
      ADD CONSTRAINT fk_person_user_id
      FOREIGN KEY (userId)
      REFERENCES User (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE;
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE Company
      ADD CONSTRAINT fk_company_user_id
      FOREIGN KEY (userId)
      REFERENCES User (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE;
    `);


    await queryInterface.addColumn('DocumentVerification', 'document_mark', {
      type: Sequelize.ENUM('default', 'company_registration', 'green_card', 'passport'),
      allowNull: false,
      default: 'default'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE DocumentVerification
      DROP COLUMN document_mark;
    `);
  
    await queryInterface.sequelize.query(`
      ALTER TABLE Company
      DROP FOREIGN KEY fk_company_user_id;
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE Person
      DROP FOREIGN KEY fk_person_company_id;
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE Person
      DROP FOREIGN KEY fk_person_user_id;
    `);

    await queryInterface.dropTable('Company');
    await queryInterface.dropTable('Person');
  }
};
