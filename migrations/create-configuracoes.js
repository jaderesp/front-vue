'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
      ler sobre migrate aqui: https://imasters.com.br/banco-de-dados/tutorial-de-migrations-com-node-js-e-sequelize
     */

     await queryInterface.createTable('Configuracoes', {
        id_conf: {
            type:Sequelize.INTEGER.ZEROFILL,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        id_conta: {
            type:Sequelize.INTEGER.ZEROFILL,
            allowNull: false,
        },
        msgWelcome: {
            type: Sequelize.STRING(4000), /* true/false = se será enviada mensagem quando houver mesmo contato registrado na lista (duas sessoes) */
            allowNull: false
        },
        msgCancelSend: {
            type: Sequelize.STRING(4000), /* cancelamento de envio de mensagem para contato (por solicitação do mesmo) */
            allowNull: false
        },
        msgCancelSuccess: {
            type: Sequelize.STRING(4000), /* cancelamento de recebimento de mensagens (campanhas) */
            allowNull: false
        },
        pchaveExitCamp: {
            type: Sequelize.STRING(600), /* cpalavra chave  para solicitar saida da lista */
            allowNull: false
        },
        pchaveConfirm: {
            type: Sequelize.STRING(600), /* cpalavra chave de confirmação de cancelamento de recebimento de mensagens de campanhas */
            allowNull: false
        },
        mediaUrl: {
            type:Sequelize.STRING(600),
            allowNull:true
        },  
        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      })
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Configuracoes');
    }

  }