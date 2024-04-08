'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
      ler sobre migrate aqui: https://imasters.com.br/banco-de-dados/tutorial-de-migrations-com-node-js-e-sequelize
     */

     await queryInterface.createTable('Intent', {
        id_intent: {
            type:Sequelize.INTEGER.ZEROFILL,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        id_conta: {
            type:Sequelize.INTEGER.ZEROFILL,
            allowNull: false,
        },
        pchaves: {
            type: Sequelize.STRING,
            allowNull: false
        },
        opExata: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true, /* true = de ser igual (todas as palavras chaves devem conter na mensagem -   false = qualquer palavra chave pode conter na mensagem para disparar a mensagem) */
        }, 
        posx: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        posy: {
            type: Sequelize.INTEGER,
            allowNull: true
        },         
        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      })
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Intent');
    }

  }