'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
      ler sobre migrate aqui: https://imasters.com.br/banco-de-dados/tutorial-de-migrations-com-node-js-e-sequelize
     */

     await queryInterface.createTable('Media', {
        id_md: {
          type:Sequelize.INTEGER.ZEROFILL,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        id_conta: {
            type:Sequelize.INTEGER.ZEROFILL,
            allowNull: false,
        },   
        mediaUrl: {
            type:Sequelize.STRING,
            allowNull:false
        },
        name: {
            type: Sequelize.STRING(600), /* true/false = se será enviada mensagem quando houver mesmo contato registrado na lista (duas sessoes) */
            allowNull: false
        },
        titulo: {
            type: Sequelize.STRING(2000), /* true/false = se será enviada mensagem quando houver mesmo contato registrado na lista (duas sessoes) */
            allowNull: false
        },
        type: {
            type: Sequelize.STRING(120), /* receber string jsonObject (segmentos: regiao(DDD), e por etiquetas ) */
            allowNull:false
        },
        size: {
            type: Sequelize.STRING(120), /* receber string jsonObject (segmentos: regiao(DDD), e por etiquetas ) */
            allowNull:false
        },
        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      })
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Media');
    }

  }