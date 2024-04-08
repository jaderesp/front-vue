'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
      ler sobre migrate aqui: https://imasters.com.br/banco-de-dados/tutorial-de-migrations-com-node-js-e-sequelize
     */

     await queryInterface.createTable('UsuarioSetor', {
        id_us: {
            type:Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        idusuario: {
            type:Sequelize.INTEGER,
            allowNull: false,
        }, 
        id_setor: {
            type:Sequelize.INTEGER.ZEROFILL,
            allowNull: false,
        },   
        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      })
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('UsuarioSetor');
    }

  }