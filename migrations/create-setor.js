'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
      ler sobre migrate aqui: https://imasters.com.br/banco-de-dados/tutorial-de-migrations-com-node-js-e-sequelize
     */

     await queryInterface.createTable('Setor', {
        id_setor: {
            type:Sequelize.INTEGER.ZEROFILL,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        id_conta: {
            type:Sequelize.INTEGER.ZEROFILL,
            allowNull: false,
        },    
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        }, 
        cor: {
            type:Sequelize.STRING,
            allowNull:false
        },  
        mensagem_abordagem: { /* ativo ou inativo */
            type:Sequelize.STRING(3000),
            allowNull:true
        },   
        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      })
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Setor');
    }

  }