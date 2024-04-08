'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
      ler sobre migrate aqui: https://imasters.com.br/banco-de-dados/tutorial-de-migrations-com-node-js-e-sequelize
     */

     await queryInterface.createTable('MsgsCampanha', {
        id_msgcamp: {
            type:Sequelize.INTEGER.ZEROFILL,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        id_camp: {
            type:Sequelize.INTEGER.ZEROFILL,
            allowNull: false,
        },
        id_msg: { /* id da mensagem entregue pelo whatsapp */
            type: Sequelize.STRING(300),
            allowNull: true
        },
        status: {
            type: Sequelize.STRING(200), /* status da msg via webhook */
            allowNull: false
        },
        ack: {
            type: Sequelize.STRING(300), /* status da msg via webhook */
            allowNull: false
        },
        number: { /* numbero do contato */
            type: Sequelize.STRING(300),
            allowNull: false
        },
        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      })
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('MsgsCampanha');
    }

  }