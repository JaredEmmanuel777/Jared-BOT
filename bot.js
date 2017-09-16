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

// Help
client.on('message', msg => {
	if (msg.content.startsWith(prefix + 'help')) {
    	msg.channel.send({embed: {
       	color: 3447003,
      	author: {
      		name: client.user.username,
    	},
       	title: "Help",
        description: "Help list. All commands should start with a <j!> .",
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
	
	console.log(msg.author.username + " just called the <j!>help command " + " in " + msg.guild.name);
  }
});

// Installation in different server alert
client.on("guildCreate", guild => {
	console.log(" <Jared> BOT just got added to " + guild.name + " , owned by " + guild.owner.user.username + " ! ");
});

// Version request
client.on('message', msg => {
	if (msg.content == (prefix + "version")) {
		msg.reply("Current version: 1.0.0");

		console.log(msg.author.username + " just asked the BOT's version in " + msg.guild.name);
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

// DM
client.on('message', msg => {
	if (msg.content.startsWith(prefix + "dm")) {
		let args = msg.content.split(" ").slice(1);
		let content = args.join(" ")
		msg.author.sendMessage(content)
		console.log(msg.author.username + " just made the BOT DM him/her " + content + " in " + msg.guild.name);
	}
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
	if (msg.content.startsWith(prefix + 'help')) {
    	msg.channel.send({embed: {
       	color: 3447003,
      	author: {
      		name: client.user.username,
    	},
       	title: "Credits",
        description: "Thanks to all the people who helped me in this BOT.",
    	fields: [{
			name: "Programming Robot#5881",
			value: 'For helping me with the help code. I really appreciate it!'
		},
		{
        	name: "﷽﷽(AKA PycoPixel)#4565",
        	value: "For inspiration of the Plather BOT."
      	},
      	{
        	name: "Kyle2000#1009",
        	value: "For his videos in YouTube. It helped a lot!"
      	}],
    timestamp: new Date(),
    footer: {
      	icon_url: client.user.avatarURL,
      	text: "© Jared Emmanuel"
    	}
	}
	});
	
	console.log(msg.author.username + " just called the <j!>credits command " + " in " + msg.guild.name);
  }
});








/*
---------------------------------------------------------------------------------------------------------------------
|		______						 ___		___________							________		_______			|
|		|     \		|				/   \			 |			|			|		|				|		\		|
|		|     |		|			   /     \			 |			|___________|		|				|		|		|
|		|_____/		|			  /_______\			 |			|			|		|------			|_______/		|
|		|			|			 /         \		 |			|			|		|				|		\		|
|		|			|_______	/           \		 |			|			|		|_______		|		 \		|
|																													|
|		_______					 ________		__			________												|
|		|	   \	|			/		 \		| \		|	|														|
|		|			|			|		 |		|  \	|	|														|
|		|			|			|		 |		|	\	|	|-------												|
|		|			|			|		 |		|	 \	|	|														|
|		|______/	|______		\________/		|	  \_|	|________												|
|																													|
---------------------------------------------------------------------------------------------------------------------
*/

// Points System
/*
client.on('message', msg => {
	let points = JSON.parse(fs.readFileSync("./points.json", "utf8"));
	
	if (!msg.content.startsWith(prefix)) return;
	
	if (msg.author.bot) return;

	if (!points[msg.author.id]) points[msg.author.id] = {
  		points: 0,
  		level: 0
	};
	
	let userData = points[msg.author.id];
	
	userData.points++;

	let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
	
	if (curLevel > userData.level) {
		// Level up!
  		userData.level = curLevel;
  		msg.reply('You have leveled up to level **${curLevel}**. Awesome!?');
	}

	if (msg.content.startsWith(prefix + "level")) {
  		msg.reply('You are currently level ${userData.level}, with ${userData.points} points.');
	}
	
	fs.writeFile("./points.json", JSON.stringify(points), (err) => {
	  
	if (err) console.error(err)
	
	});
});
*/
client.login(token);
