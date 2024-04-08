'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
      ler sobre migrate aqui: https://imasters.com.br/banco-de-dados/tutorial-de-migrations-com-node-js-e-sequelize
     */

     await queryInterface.createTable('Plano', {
        id_plan: {
            type:Sequelize.INTEGER.ZEROFILL,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },        
        qtde_sessao: {
            type:Sequelize.INTEGER,
            allowNull: false,
        },
        qtde_contatos: {
            type:Sequelize.INTEGER,
            allowNull: false,
        },
        valor: {
            type:Sequelize.DECIMAL,
            allowNull: false,
        },    
        ciclo: {
            type: Sequelize.STRING(300), /* cilco: mensal, semestral, anual */
            allowNull: false
        },
        titulo: {
            type: Sequelize.STRING(300),
            allowNull: false
        },
        tipo: {
            type: Sequelize.STRING(300), /* basico, intermediario ou avançado etc. */
            allowNull: false
        },
        descricao: {
            type: Sequelize.STRING(3000),
            allowNull: false
        },   
        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      })
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Plano');
    }

  }