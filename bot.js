//Get API and token
var token = process.env.TOKEN;
var Bot = require('node-telegram-bot-api');
var bot;

//Variables to use in code
var driveCounter = 0;

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

bot.onText(/^/, function (msg){
//Create vars 
  var name = msg.from.first_name;
  var msgText = msg.text;
  var chatid = msg.chat.id;
  var sendString;

//Log message
console.log('ONTEXT TRIGGER:\nChat ID: ' + chatid + '\nFrom: ' + name +'\nMessage: ' + msgText);

sendString= 'UW MOEDER';
bot.sendMessage(245720309, sendString);

//Responses
if (msgText.toLowerCase().includes('wie rijd')){
  switch(driveCounter){
    case 0:
      sendString= 'Beurt: Steffen';
      driveCounter++;
      break;
    case 1:
      sendString= 'Beurt: Kevin';
      driveCounter++;
      break;
    case 2:
      sendString= 'Beurt: Jori';
      driveCounter=0;
      break;
    default:
      sendString= 'Uw moeder';
  }
  bot.sendMessage(chatid, sendString);

}else if (msgText.toLowerCase()=='wut'){
  sendString= 'Hallo ' + name + '!';
  bot.sendPhoto(chatid, "http://i.imgur.com/1JdLiGS.png");

}else if (msgText.toLowerCase()=='hallo' || msgText.toLowerCase()=='hello' || msgText.toLowerCase()=='hi'){
  sendString= 'Hi ' + name + '!';
  bot.sendMessage(chatid, sendString);

} else if (msgText.toLowerCase()=='k'){
  sendString= 'EEN PRACHTIGE LETTER ' + name.toUpperCase() + '!';
  bot.sendMessage(chatid, sendString);

} else if (msgText.toLowerCase() == 'lol' && !(msgText == "LOL")){
  bot.sendVideo(chatid, "https://media1.giphy.com/media/fGuqeA6PiXINa/giphy.gif");

} else if (msgText.toLowerCase().includes('goesting') || msgText.toLowerCase().includes('zin in')){
  sendString = '( ͡° ͜ʖ ͡°)';
  bot.sendMessage(chatid, sendString);
}
});

module.exports = bot;
