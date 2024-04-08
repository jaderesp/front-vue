'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
      ler sobre migrate aqui: https://imasters.com.br/banco-de-dados/tutorial-de-migrations-com-node-js-e-sequelize
     */

     await queryInterface.createTable('Sessao', {
        id_sess: {
            type:Sequelize.INTEGER.ZEROFILL,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        id_conta: {
            type:Sequelize.INTEGER.ZEROFILL,
            allowNull: false,
        },
        session_json: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nome_sess: {
            type: Sequelize.STRING,
            allowNull: false
        }, 
        nomeApi_sess: {
            type: Sequelize.STRING(400),
            allowNull: false
        },
        number_sess: {
            type: Sequelize.STRING,
            allowNull: false
        },
        qrcode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status_sess: {
            type: Sequelize.STRING,
            allowNull: false
        },    
        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      })
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Sessao');
    }

  }