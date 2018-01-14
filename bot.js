module.exports = bot;

//Get API and token
var token = process.env.TOKEN;
var Bot = require('node-telegram-bot-api');
var bot;

//Variables to use in code
var driveCounter = 0;
var kCounter = 0;
var kName = "";

//Set webhook
if (process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
} else {
  bot = new Bot(token, {
    polling: true
  });
}

//Log on console
console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

//Receive message
bot.onText(/^/, function (msg) {
  //Create vars 
  var name = msg.from.first_name.toLowerCase();
  var msgText = msg.text;
  var chatid = msg.chat.id;
  var messid = msg.message_id;
  var sendString;

  //Log message
  console.log('ONTEXT TRIGGER:\nChat ID: ' + chatid + '\nFrom: ' + name + '\nMessage: ' + msgText);

  //Person replies
  if (kCounter > 0 && name == kName && msgText.toLowerCase() != 'k') {
    sendString = 'k'
    bot.sendMessage(chatid, sendString);
    kCounter--
  }

  //Responses
  if (msgText.toLowerCase() == 'wut') {
    sendString = 'Hallo ' + name + '!';
    bot.sendPhoto(chatid, "http://i.imgur.com/1JdLiGS.png");

  } else if (msgText.toLowerCase() == 'hallo' || msgText.toLowerCase() == 'hello' || msgText.toLowerCase() == 'hi') {
    sendString = 'Hi ' + name + '!';
    bot.sendMessage(chatid, sendString);

  } else if (msgText.toLowerCase() == 'k') {
    kName = name;
    kCounter = 3;
    sendString = 'EEN PRACHTIGE LETTER ' + name.toUpperCase() + '!';
    bot.sendMessage(chatid, sendString);

  } else if (msgText.toLowerCase() == 'lol' && !(msgText == "LOL")) {

    deleteMessage(chatid, messid);
    sendString = 'LADIES AND GENTLEMEN, ' + nametoUpperCase()  + 'IS LAUGHING OUT LOUD!';
    bot.sendMessage(chatid, sendString);

    var r = Math.floor(Math.random() * 4);

    switch (r) {
      case 0:
        bot.sendVideo(chatid, "https://media1.tenor.com/images/2b84c3aab34089d0d114cf5e73fc1eb6/tenor.gif");
        break;
      case 1:
        bot.sendVideo(chatid, "https://m.popkey.co/a63d01/KAV6_f-maxage-0_s-200x150.gif");
        break;
      case 2:
        bot.sendVideo(chatid, "https://media1.tenor.com/images/0489fb2f025d80cb993ac1e2712682fa/tenor.gif");
        break;
      case 3:
        bot.sendVideo(chatid, "https://media.tenor.com/images/a578b2df97812643906774ca0811952a/tenor.gif");
        break;
    }
  }
});
