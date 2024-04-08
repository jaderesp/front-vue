'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
      ler sobre migrate aqui: https://imasters.com.br/banco-de-dados/tutorial-de-migrations-com-node-js-e-sequelize
     */

    await queryInterface.createTable('AutobFluxo', {
      id_abf: {
        type: Sequelize.INTEGER.ZEROFILL,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      id_ticket: {
        type: Sequelize.INTEGER.ZEROFILL,
        allowNull: false
      },
      ultimaResp: { /* caso contato informe resposta inexistente reenviar mesma mensagem */
        type: Sequelize.INTEGER.ZEROFILL,
        allowNull: false
      },
      // Timestamps
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Assinatura');
  }

}