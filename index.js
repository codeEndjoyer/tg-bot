
const TelegramApi = require('node-telegram-bot-api');
const {gameOptions, againOptions} = require('./options.js');
const token = '7192644052:AAEabbNO9CpV4HudjQirWyDSaYCjGctzG6E';

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Я загадаю от 0 до 9, а ты угадай:)`)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, `Отгадай`, gameOptionst)
}

const start = () => {
    bot.setMyCommands( [
        {command: '/start',description: 'Привет'},
        {command: '/info',description: 'Инфо'},
        {command: '/game',description: 'Угадай цифру'},
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://cdn.tlgrm.ru/stickers/9ef/db1/9efdb148-747f-30f8-9575-7f6e06d34bac/192/7.webp')
            return bot.sendMessage(chatId, `Привет я верный бот Супер-коли`)
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Ты ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if (text === '/game') {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю!)')
    });

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if(data === '/again') {
            return startGame(chatId);
        }
        if(data === chats[chatId]) {
            return await bot.sendMessage(chatId, `Ты отгадал ${chats[chatId]}`, againOptionst)
        } else {
            return bot.sendMessage(chatId, `Ты не угадал :( Бот загадывал ${chats[chatId]}`, againOptionst)
        }
        bot.sendMessage(chatId, `Твоя цифра ${data}`)
    })

}

start()