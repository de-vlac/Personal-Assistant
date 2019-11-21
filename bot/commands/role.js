const {
	admin,
	moderator,
	normaluser,
} = require('../roles.json');

module.exports = {
	name: 'role',
	description: 'Add a role to the user !',
	execute(message) {
		const args = message.content.split(' ');
		var role = message.guild.roles.find( 'name' , args[1]);
		if(!role){
			return message.channel.send('Sorry I can\'t find this role.');
		}

		for (var i in admin){
		 if(admin[i].toLowerCase() ==  args[1].toLowerCase()){
			if (!message.member.hasPermission("ADMINISTRATOR")) {
				return message.reply('You don\'t have permission to do this now do you ? ');
			} else {
	  	  			
					message.member.addRole(role.id);
					message.delete();
					return message.channel.send('Job done sir.');
	  	  		
		       }	
		 }
		}
		for (var i in moderator){
		 if(moderator[i].toLowerCase() ==  args[1].toLowerCase()){
			if (!message.member.hasPermission("BAN_MEMBERS")) {
				return message.reply('You don\'t have permission to do this now do you ? ');
			} else {
	  	  			
					message.member.addRole(role.id);
					message.delete();
					return message.channel.send('Job done sir.');
	  	  		
		       }	
		 }
		}
		for (var i in normaluser){
			if(normaluser[i].toLowerCase() ==  args[1].toLowerCase()){
				message.member.addRole(role.id);
				message.delete();
				return message.channel.send('Job done sir.');
			}
		}
		
		return message.channel.send('Sorry sir I don\'t know this role.'); 
		
 },
};
