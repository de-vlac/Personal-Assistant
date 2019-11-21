module.exports = {
	name: 'kick',
	description: 'Kick a user',
	execute(message) {
		const member = message.mentions.members.first();
		
		if (message.member == member){
			return message.channel.send('Don\'t kick yourself bro :( ');
		}
		if (!member) {
			return message.reply('You have to say it this way : \'!kick @user\' else i won\'t understand you, got it?');
		}

		if (!message.member.hasPermission("KICK_MEMBERS")) {
			return message.reply('You don\'t have permission to do this now do you ? ');
		}

		if (!member.kickable) {
			return message.reply('You can\'t kick this guy he is stronger than you <:GWvertiPeepoSadMan:405951684339302400>');
		}

		return member
			.kick()
			.then(() => message.reply(`I hate my work, today i had to kick ${member.user.tag}, I\'m so sad.`))
			.catch(error => message.reply('Sorry, an error occured.'));
	},
};
