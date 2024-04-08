'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
      ler sobre migrate aqui: https://imasters.com.br/banco-de-dados/tutorial-de-migrations-com-node-js-e-sequelize
     */

     await queryInterface.createTable('Assinatura', {
        id_ass: {
            type:Sequelize.INTEGER.ZEROFILL,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        id_conta: {
            type:Sequelize.INTEGER.ZEROFILL,
            allowNull: false,
            unique: true
        },
        id_plan: {
            type:Sequelize.INTEGER.ZEROFILL,
            allowNull: false
        },   
        status: { /* ativo ou inativo */
            type:Sequelize.STRING,
            allowNull:true
        }, 
        assinatura_id: { /* id da assiantura no asaas */
            type: Sequelize.STRING(300),
            allowNull: true
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