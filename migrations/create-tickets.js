'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
      ler sobre migrate aqui: https://imasters.com.br/banco-de-dados/tutorial-de-migrations-com-node-js-e-sequelize
     */

     await queryInterface.createTable('Tickets', {
        id_ticket: {
            type:Sequelize.INTEGER.ZEROFILL,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        protocolo: { /* NUM. ATENDIMENTO:  sequencia LETRA (INICIAIS DO SETOR + ID_TICKET) */
            type: Sequelize.TEXT,
            allowNull: true
        }, 
        id_conta: {
            type:Sequelize.INTEGER.ZEROFILL,
            allowNull: false,
        },
        id_sess: { /* relacional = caso não seja informado a mensagem será eviadas utilizando todas as sessões da conta */
            type:Sequelize.INTEGER.ZEROFILL,
            allowNull:false
        },
        idContato: { /* contato (relacional) */
            type:Sequelize.STRING,
            allowNull:false
        },
        idusuario: {
            type:Sequelize.INTEGER.ZEROFILL,
            allowNull: true
        },
        id_setor: { /* mesmo que queue (fila) */
            type:Sequelize.INTEGER.ZEROFILL,
            allowNull: false
        },
        isGroup: {
            type:Sequelize.STRING,
            allowNull:true,
            defaultValue: 'false',
        },
        lastMessage: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        status: {
            type: Sequelize.TEXT,
            allowNull: false
        },   
        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      })
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Tickets');
    }

  }