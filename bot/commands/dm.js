module.exports = {
	name: 'dm',
	description: 'Send a private message do user',
	execute(message) {
		const member = message.mentions.members.first();
		const args = message.content.split(' ');
		let phrase = '';
		for(var i = 2; i < args.length; i++){
			phrase = phrase+args[i]+" ";
		}

		if (message.member == member){
			return message.channel.send('Why would you speak with yourself ');
		}
		if (!member) {
			return message.reply('You have to say it this way : \'!dm @user [message]\' else i won\'t understand you, got it?');
		}
		
		member.send(""+phrase)
		return message.author.send("This message was sent to "+member+" : "+phrase)
	},
};
