var token = process.env.TOKEN;
var Bot = require('node-telegram-bot-api');
var bot;

if(process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new Bot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');


bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  
 if (msg="k") {
    bot.sendMessage(msg.chat.id, 'GOH ' + name + ', WAT EEN MOOIE LETTER!').then(function () {
    });
  }
});

module.exports = bot;
