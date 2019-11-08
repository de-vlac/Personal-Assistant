const util = require('util');
const sleep = util.promisify(setTimeout);

module.exports = {
	name: 'bye',
	description: 'Will disconnect the bot',
	async execute(message) {
		message.channel.send('Bye ! :\'( ');
		await sleep(1000);
		process.exit();
 },
};


