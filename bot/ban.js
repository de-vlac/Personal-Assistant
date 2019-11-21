module.exports = {
	name: 'ban',
	description: 'Ban a user',
	execute(message) {
		const member = message.mentions.members.first();
		
		if (message.member == member){
			return message.channel.send('Don\'t ban yourself bro :( ');
		}

		if (!member) {
			return message.reply('You have to say it this way : \'!ban @user\' else i won\'t understand you, got it?');
		}

		if (!message.member.hasPermission("BAN_MEMBERS")) {
			return message.reply('You don\'t have permission to do this now do you ? ');
		}

		return member
			.ban()
			.then(() => message.reply(`I hate my work, today i had to ban ${member.user.tag}, I\'m so sad.`))
			.catch(error => message.reply('Sorry, an error occured.'));
	},
};
