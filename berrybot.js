var Discord = require("discord.js");
var mybot = new Discord.Client();
var request = require("request");
var Cleverbot = require("cleverbot-node");
var auth = require("./auth.json");

var counter = 0;

cleverbot = new Cleverbot;

mybot.login(auth.email, auth.pass);

mybot.on("message", function(message){
	var potato = message.content.toLowerCase();
	var words = potato.split(' ');
	var command = words[0];
		switch(command) {
			case "/help":
				mybot.reply(message, "https://github.com/Kerryliu/berrybot");
				break;
			case "/pussy":
			case "/cat":
			case "/kitty":
				request("http://random.cat/meow", function(error, response, body) {
					if(!error && response.statusCode == 200) {
						var result = JSON.parse(body);
						mybot.reply(message, result.file);
					}
				});
				break;
			case "/insult":
				request("http://quandyfactory.com/insult/json", function(error, response, body) {
					if(!error && response.statusCode == 200) {
						var result = JSON.parse(body);
						mybot.reply(message, result.insult);
					}
				});
				break;
			case "/joke":
				request("http://tambal.azurewebsites.net/joke/random", function(error, response, body) {
					if(!error && response.statusCode == 200) {
						var result = JSON.parse(body);
						mybot.reply(message, result.joke);
					}
				});
				break;
			case "/id":
				try {
					mybot.reply(message, "\nName: " + mybot.servers[1].channels[words[1]].name + "\nType: " + mybot.servers[1].channels[words[1]].type + "\nID: " + mybot.servers[1].channels[words[1]].id);
				} catch (err) {
					mybot.reply(message, "Invalid Channel Number");
				}
				break;
			case "ping":
				mybot.reply(message, "pong");
				break;
			default:
				if (message.include("(╯°□°）╯︵ ┻━┻")) {
					mybot.sendMessage(message.channel, "┬──┬◡ﾉ(° -°ﾉ) ");
				} else if(command.substr(0,3) == "ayy") {
					mybot.reply(message, "lmao");
				} else if (command.substr(0,3) == "and") {
					counter++;
					console.log(counter);
					if(counter > 1) {
						mybot.reply(message, "And my axe!");
						counter = 0;
					}
				} else if (command.includes("121398650738835458")) {
					mybot.startTyping(message.channel);
					Cleverbot.prepare(function(){
						cleverbot.write(message.content, function (response) {
							console.log(response.message);
							mybot.reply(message, response.message, true);
							mybot.stopTyping(message.channel);
						});
					});
				}
				break;
		}
});
