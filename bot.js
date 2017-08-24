//Get API and token
var token = process.env.TOKEN;
var Bot = require('node-telegram-bot-api');
var bot;

//Set webhook
if(process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new Bot(token, { polling: true });
}

//Log on console
console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

bot.onText(/^/, function (msg) {
//Create vars 
  var name = msg.from.first_name;
  var msgText = string(msg.text);
  var chatid = string(msg.chat.id);

//Responses
if (msgText.toLowerCase()=='k'){
  bot.sendMessage(chatid, 'EEN PRACHTIGE LETTER ' + name.toUpperCase() + '!');

} else if (msgText.toLowerCase() == 'lol' && !(msgText == "LOL")){
  bot.sendVideo(chatid, "https://media1.giphy.com/media/fGuqeA6PiXINa/giphy.gif");

} else if (msgText.toLowerCase().includes('goesting') || msgText.toLowerCase().includes('zin in')){
  bot.sendMessage(chatid, '( ͡° ͜ʖ ͡°)');
}
});

module.exports = bot;
