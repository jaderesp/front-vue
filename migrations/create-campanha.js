'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
      ler sobre migrate aqui: https://imasters.com.br/banco-de-dados/tutorial-de-migrations-com-node-js-e-sequelize
     */

     await queryInterface.createTable('Campanha', {
      id_camp: {
            type:Sequelize.INTEGER.ZEROFILL,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        id_conta: {
            type:Sequelize.INTEGER.ZEROFILL,
            allowNull: false,
        },
        id_sess: { /* relacional = caso não seja informado a mensagem será eviadas utilizando todas as sessões da conta */
            type:Sequelize.INTEGER.ZEROFILL,
            allowNull:false
        },
        nome: {
            type: Sequelize.STRING(300),
            allowNull: false
        },
        mensagem: {
            type: Sequelize.STRING(1200),
            allowNull: false
        },
        mediaUrl: {
            type:Sequelize.STRING,
            allowNull:true
        },
        segmentacao: {
            type: Sequelize.STRING(2000), /* receber string jsonObject (segmentos: regiao(DDD), e por etiquetas ) */
            allowNull: true
        },
        segmentaEtiq: {
            type: Sequelize.STRING(2000), /* receber string jsonObject (segmentos: regiao(DDD), e por etiquetas ) */
            allowNull: true
        },
        contato_duplicado: {
            type: Sequelize.STRING, /* se será enviada mensagem quando houver mesmo contato registrado na lista (duas sessoes) */
            allowNull: false
        },
        status: { /* ativo ou inativo */
            type:Sequelize.STRING,
            allowNull:true
        }, 
        agendamento:{
            type: Sequelize.DATE,  
            allowNull: false
        },
        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      },
      {                                  
        charset: "utf8mb4",                                  
        collate: "utf8mb4_general_ci",                                  
      })
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Campanha');
    }

  }