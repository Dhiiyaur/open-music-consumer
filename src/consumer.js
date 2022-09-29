require('dotenv').config();
const amqp = require('amqplib');
const pool = require('./repository/db/repository');
const MailService = require('./service/mail/mailService');
const PlaylistService = require('./service/playlist/playlistService');
const ListenerService = require('./service/listener/listenerService');

const init = async () => {
    const mailService = new MailService();
    const playlistService = new PlaylistService(pool);
    const listenerService = new ListenerService(playlistService, mailService);

    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();

    await channel.assertQueue('export:user-playlist', {
        durable: true,
    });

    channel.consume(
        'export:user-playlist',
        listenerService.listener,
        { noAck: true },
    );
};

init();
