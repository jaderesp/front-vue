'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
          ler sobre migrate aqui: https://imasters.com.br/banco-de-dados/tutorial-de-migrations-com-node-js-e-sequelize
         */

        await queryInterface.createTable('Mensagem', {
            idMsgAuto: {
                type: Sequelize.INTEGER.ZEROFILL,
                autoIncrement: true,
                primaryKey: true
            },
            idMsg: {
                type: Sequelize.STRING(300),
                primaryKey: true
            },
            id_conta: {
                type: Sequelize.INTEGER.ZEROFILL,
                allowNull: false,
            },
            idContato: { /* contato (relacional) */
                type: Sequelize.STRING,
                allowNull: false
            },
            id_ticket: {
                type: Sequelize.INTEGER.ZEROFILL,
                allowNull: false
            },
            chatId: {
                type: Sequelize.STRING,
                allowNull: false
            },
            id_sess: {
                type: Sequelize.INTEGER.ZEROFILL,
                allowNull: false
            },
            id_camp: {
                type: Sequelize.INTEGER.ZEROFILL, /* informar o id da campanha quando a mensagem for enviado por uma campanha */
                allowNull: true
            },
            body: {
                type: Sequelize.STRING(2500),
                allowNull: true
            },
            traducao: {
                type: Sequelize.STRING(2500),
                allowNull: true
            },
            ack: { /* status da mensagem */
                type: Sequelize.STRING,
                allowNull: false
            },
            /* região do DDD */
            type: { /* chat, media, audio etc... */
                type: Sequelize.STRING,
                allowNull: false
            },
            /* se contato da agenda ou não: true or false */
            mediaUrl: {
                type: Sequelize.STRING(1500),
                allowNull: false
            },
            mimetype: {
                type: Sequelize.STRING,
                allowNull: false
            },
            size_file: {
                type: Sequelize.STRING
            },
            fromMe: {
                type: Sequelize.STRING,
                allowNull: false
            },
            isGroupMsg: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: 'false',
            },
            contactAvatarGroup: { /* quando for grupo, identificar quem enviou a mensagem */
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: 'false',
            },
            remetenteGrupo: { /* quando for grupo, identificar quem enviou a mensagem */
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: 'false',
            },
            destinatario: { /* destinatario da mensagem */
                type: Sequelize.STRING,
                allowNull: false
            },
            // Timestamps
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Mensagem');
    }

}