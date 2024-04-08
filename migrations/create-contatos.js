'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
      ler sobre migrate aqui: https://imasters.com.br/banco-de-dados/tutorial-de-migrations-com-node-js-e-sequelize
     */

    await queryInterface.createTable('Contatos', {
      idContato: {
        type: Sequelize.INTEGER.ZEROFILL,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      id_conta: {
        type: Sequelize.INTEGER.ZEROFILL,
        allowNull: false,
      },
      id_sess: {
        type: Sequelize.INTEGER.ZEROFILL,
        allowNull: true
      },
      use_all_session: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'false'
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nome_verificado: {
        type: Sequelize.STRING,
        allowNull: true
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      profilePic: {
        type: Sequelize.STRING
      },
      /* região do DDD */
      regiao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      traduzir: {
        type: Sequelize.STRING,
        allowNull: true
      },
      /* se contato da agenda ou não: true or false */
      IsContact: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isGroup: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'false',
      },
      isMe: {
        type: Sequelize.STRING,
        allowNull: true
      },
      campanhaOff: { /* nao receber mensagens de campanhas */
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: false,
      },
      status: { /* ativo ou inativo */
        type: Sequelize.STRING,
        allowNull: true
      },
      // Timestamps
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Contatos');
  }

}