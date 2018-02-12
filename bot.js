const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./botsettings.json");
const token = config.token;
const prefix = config.prefix;

// Logs in console
client.on('ready', () => {
  client.user.setGame("<j!>help");
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
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

// Installation in different server alert
client.on("guildCreate", guild => {
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

// Uninstallation from different servers alert
client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

// Greets new members
client.on('guildMemberAdd', member => {
    member.guild.defaultChannel.send(`Welcome to the server, ${member}! Hope you have a good time here! :wink:`);

    const channel = member.guild.channels.find('name', 'member-log');
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}! Hope you have a good time here! :wink:`);
});

client.on('message', async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Help
  if (command === "help") {
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
          name: "ping",
          value: "Greets with a Pong!"
        },
        {
          name: "Administrator and Moderator commands:",
          value: ""
        },
        {
          name: "kick",
          value: "Kicks someone out of a server."
        },
        {
          name: "ban",
          value: "Bans a member from a server"
        },
        {
          name: "purge",
          value: "Purges 2-100 comments."
        },
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Jared Emmanuel"
        }
      }});
      console.log(msg.author.username + " just called the <j!>help command " + " in " + msg.guild.name);
  }

  // Credits
  if (command === "credits") {
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
      }});
      console.log(msg.author.username + " just called the <j!>credits command " + " in " + msg.guild.name);
  };

  // Version request
  if (command === "version") {
    msg.reply("Current version: 2.0.0");

    console.log(msg.author.username + " just asked the BOT's version in " + msg.guild.name);
  }

  // Echo
  if (msg.content.startsWith(prefix + "echo")) {
    let args = msg.content.split(" ").slice(1);
    let thingToEcho = args.join(" ")
    msg.channel.sendMessage(thingToEcho)

    console.log(msg.author.username + " just made the BOT say " + thingToEcho + " in " + msg.guild.name);
  }

  // DM
  if (msg.content.startsWith(prefix + "dm")) {
    let args = msg.content.split(" ").slice(1);
    let content = args.join(" ")
    msg.author.sendMessage(content)
    
    console.log(msg.author.username + " just made the BOT DM him/her " + content + " in " + msg.guild.name);
  }

  // Ping
  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);

    console.log(msg.author.username + " just called the <j!>ping command" + " in " + msg.guild.name);
  }

  // Say
  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);

    console.log(msg.author.username + " just made the BOT say " + sayMessage + " in " + msg.guild.name);
  }

  // Kick
  if(command === "kick") {
    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the kick!");
    
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

    console.log(msg.author.username + " just used the <j!>kick command " + " in " + msg.guild.name);
  }

  // Ban
  if(command === "ban") {
   if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the ban!");
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);

    console.log(msg.author.username + " just used the <j!>ban command " + " in " + msg.guild.name);
  }

  // Purge
  if(command === "purge") {
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));

      console.log(msg.author.username + " just used the <j!>purge command " + " in " + msg.guild.name);
  }

});

client.login(token);
