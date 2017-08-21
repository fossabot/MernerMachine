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
bot.onText(/^/, function (msg) {
  var name = msg.from.first_name;
  if (msg.text =='k' || msg.text == 'K'){
    bot.sendMessage(msg.chat.id, 'GOH ' + name + ', WAT EEN MOOIE LETTER!').then(function () {});
  }
  if (msg.text =='lol' || msg.text =='LOL'){
    bot.sendMessage(msg.chat.id, 'HAHA,' + name + ' zo grappig HAHAHAHA').then(function () {});
  }
  });

module.exports = bot;
