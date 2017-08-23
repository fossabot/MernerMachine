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
//Create vars 
  var name = msg.from.first_name;
  var msgText = msg.text;
  var chatid = msg.chat.id;


//Responses
  if (msgText.toLowerCase() =='Hello' || msgText.toLowerCase() =='Hallo' || msgText.toLowerCase() =='Hi' || msgText.toLowerCase() =='Hey'){
    bot.sendMessage(chatid, 'Hallo ' + name + '!');
  }
  if (msgText.toLowerCase() =='k'){
    bot.sendMessage(chatid, 'EEN PRACHTIGE LETTER ' + name.toUpperCase() + '!');
  }
  if (msgText.toLowerCase() =='lol' && !(msgText == "LOL")){
    bot.sendVideo(chatid, "https://media1.giphy.com/media/fGuqeA6PiXINa/giphy.gif");
  }
  if (msgText.toLowerCase().includes('goesting') || msgText.toLowerCase().includes('zin in')){
      bot.sendMessage(chatid, '( ͡° ͜ʖ ͡°)');
  }
});

module.exports = bot;
