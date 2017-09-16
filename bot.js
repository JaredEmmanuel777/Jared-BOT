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

// Help
client.on('message', msg => {
	if (msg.content.startsWith(prefix + 'help')) {
    	msg.channel.send({embed: {
       	color: 3447003,
      	author: {
      		name: client.user.username,
    	},
       	title: "Help",
        description: "Help list",
    	fields: [{
			name: "credits",
			value: 'Credits.'
		},
		{
        	name: "echo [message]",
        	value: "Echoes messages."
      	},
      	{
        	name: "dm [message]",
        	value: "Sends a DM."
      	},
      	{
        	name:"setGame [game]",
        	value:"Sets BOT game. If anyone sets foul messages on the BOT, I'll disable this command to everyone except me."
      	},
      	{
     		name: "Ping",
        	value: "Greets with a Pong!"
      	},
      	],
    timestamp: new Date(),
    footer: {
      	icon_url: client.user.avatarURL,
      	text: "© Jared Emmanuel"
    	}
    }
    });
  }
	console.log(msg.author.username + " just called the <j!>help command " + " in " + msg.guild.name);
});

// Installation in different server alert
client.on("guildCreate", guild => {
	console.log(" <Jared> BOT just got added to " + guild.name + " , owned by " + guild.owner.user.username + " ! ");
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

		console.log(msg.author.username + " just pinged the BOT " + " in " + msg.guild.name);
	}
});

// Messages (credits)
client.on('message', msg => {
	if (msg.content == prefix + 'credits') {
		msg.reply("Anti Hero#5881 for the help code.");
	}
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

		console.log(msg.author.username + " just made the BOT play " + game);
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
});

// Version request
client.on('message', msg => {
	if (msg.content == (prefix + "version")) {
		msg.reply("Current version: 1.0.0");

		console.log(msg.author.username + " just asked the BOT's version in " + msg.guild.name);
	}
});

client.on('message', async message => {
	if (message.author.bot) return
});


client.login(token);
