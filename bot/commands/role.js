module.exports = {
	name: 'role',
	description: 'Add a role to the user !',
	execute(message) {
		const args = message.content.split(' ');
		var role = message.guild.roles.find( 'name' , args[1]);
		if(!role){
			return message.channel.send('Sorry I can\'t find this role.');
		}
		message.member.addRole(role.id);
		message.delete();
		return message.channel.send('Job done sir.');
 },
};
