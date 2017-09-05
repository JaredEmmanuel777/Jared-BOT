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

// Greets new members
client.on('guildMemberAdd', member => {
    member.guild.defaultChannel.send(`Welcome to the server, ${member}! Hope you have a good time here! :wink:`);

    const channel = member.guild.channels.find('name', 'member-log');
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}! Hope you have a good time here! :wink:`);
});

// Messages
client.on('message', msg => {
	if (msg.author.bot) return;
	if (msg.content === prefix + 'Ping') {
		msg.reply('Pong!');
	}
});

// Echo
client.on ('message', msg => {
	if (msg.content.startsWith(prefix + "echo")) {
		let args = msg.content.split(" ").slice(1);
		let thingToEcho = args.join(" ")
		msg.channel.sendMessage(thingToEcho)
	}
});

client.login(token);
