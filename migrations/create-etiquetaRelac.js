'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
      ler sobre migrate aqui: https://imasters.com.br/banco-de-dados/tutorial-de-migrations-com-node-js-e-sequelize
     */

     await queryInterface.createTable('EtiquetaRelacao', {
              id_etiqrel: {
                type:Sequelize.INTEGER.ZEROFILL,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            id_etiq: {
                type:Sequelize.INTEGER.ZEROFILL,
                allowNull: false,
            },
            number: { /* relacional = caso não seja informado a mensagem será eviadas utilizando todas as sessões da conta */
                type:Sequelize.STRING(300),
                allowNull:true
            },
            // Timestamps
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
      })
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('EtiquetaRelacao');
    }

  }