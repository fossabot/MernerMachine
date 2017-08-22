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
    bot.sendMessage(msg.chat.id, 'WAT EEN MOOIE LETTER ' + name + '!');
  }
  if (msg.text.toLowerCase() =='lol' && !(msg.text == "LOL")){
    bot.sendVideo(msg.chat.id, "https://media1.giphy.com/media/fGuqeA6PiXINa/giphy.gif");
  }
  });

module.exports = bot;
