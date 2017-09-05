const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./botsettings.json");
const token = config.token;
const prefix = config.prefix

// Logs in console
client.on('ready', () => {
	client.user.setGame("<j!>help");
	console.log(`Logged in as ${client.user.tag}!`);
});

// Server installation alert
client.on("guildCreate", guild => {
	console.log('<Jared> BOT just got added to ${guild.name}, owned by ${guild.owner.user.username}!')
});

// Greets new members
client.on('guildMemberAdd', member => {
    member.guild.defaultChannel.send(`Welcome to the server, ${member}! Hope you have a good time here! :wink:`);

    const channel = member.guild.channels.find('name', 'member-log');
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}! Hope you have a good time here! :wink:`);
});

// Messages (Ping)
client.on('message', msg => {
	if (msg.author.bot) return;
	if (msg.content === prefix + 'Ping') {
		msg.reply('Pong!');
	}
	console.log(msg.author.username + " just pinged the BOT " + " in " + msg.guild.name);
});

// Echo
client.on ('message', msg => {
	if (msg.content.startsWith(prefix + "echo")) {
		let args = msg.content.split(" ").slice(1);
		let thingToEcho = args.join(" ")
		msg.channel.sendMessage(thingToEcho)
		console.log(msg.author.username + " just made the BOT say " + thingToEcho + " in " + msg.guild.name);
	}
});

// Set game
client.on('message', msg => {
	if (msg.content.startsWith(prefix + "setGame")) {
		/**
		if (msg.author.id !== "323279582952292352") {
			return msg.reply("!!! BOT Owner only. Sorry. !!!" + msg.author)
		}
		**/
		let args = msg.content.split(" ").slice(1);
		let game = args.join(" ")
		console.log(game)
		client.user.setGame(game)
	}
});

// DM
client.on('message', msg => {
	if (msg.content.startsWith(prefix + "dm")) {
		let args = msg.content.split(" ").slice(1);
		let content = args.join(" ")
		msg.author.sendMessage(content)
		console.log(msg.author.username + " just made the BOT DM him/her " + content + " in " + msg.guild.name);
	}
})

client.login(token);
