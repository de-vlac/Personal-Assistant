const Discord = require('discord.js');
const {
	prefix,
	token,
} = require('./config.json');
const ytdl = require('ytdl-core');

const client = new Discord.Client();

const queue = new Map();

client.once('ready', () => {
	console.log('Ready!');
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	const serverQueue = queue.get(message.guild.id);

	if (message.content.startsWith(`${prefix}play`)) {
		execute(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}skip`)) {
		skip(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}stop`)) {
		stop(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}hi`)) {
		message.channel.send('Hello!')
		return;
	} else if (message.content.startsWith(`${prefix}bye`)) {
		message.channel.send('Bye ! :\'( ');
		process.exit();
	} else if (message.content.startsWith(`${prefix}kick`)) {
		kick(message);
		return;
	} else if (message.content.startsWith(`${prefix}ban`)) {
		ban(message);
		return;
	} else if (message.content.startsWith(`${prefix}role`)) {
		addUserRole(message);
		return;
	} else {
		message.channel.send('You need to enter a valid command!')
	}
});

async function execute(message, serverQueue) {
	const args = message.content.split(' ');

	const voiceChannel = message.member.voiceChannel;
	if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return message.channel.send('I need the permissions to join and speak in your voice channel!');
	}

	const songInfo = await ytdl.getInfo(args[1]);
	const song = {
		title: songInfo.title,
		url: songInfo.video_url,
	};

	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		};

		queue.set(message.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(message.guild, queueContruct.songs[0]);
		} catch (err) {
			console.log(err);
			queue.delete(message.guild.id);
			return message.channel.send(err);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		return message.channel.send(`${song.title} has been added to the queue!`);
	}

}

function skip(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	if (!serverQueue) return message.channel.send('There is no song that I could skip!');
	serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', () => {
			console.log('Music ended!');
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => {
			console.error(error);
		});
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}

async function kick(message){

	const user = message.mentions.users.first(); //on récupere le premier utilisateur mentionné dans le message
		if (!user){ //si il n'y a eu aucune mention
			return message.channel.send('You have to say it this way : \'!kick @user\' else i won\'t understand you, got it?');
		}
		if(user === message.author) return message.channel.send('Don\'t kick yourself bro :( ');
		message.guild.member(user).kick().then((user)=> {
			message.channel.send('I hate my work, today i had to kick ' +user+ ', I\'m so sad.');
		}).catch(()=> {
			message.channel.send('You can\'t kick this guy he is stronger than you <:GWvertiPeepoSadMan:405951684339302400> ');
		});
		

}

async function ban(message) {
	const user = message.mentions.users.first(); //on récupere le premier utilisateur mentionné dans le message
		if (!user){ //si il n'y a eu aucune mention
			return message.channel.send('You have to say it this way : \'!ban @user\' else i won\'t understand you, got it?');
		}
		if(user === message.author) return message.channel.send('Don\'t ban yourself bro :( ');
		if(!message.guild.member(user).bannable) return message.channel.send('I can\'t ban this guy he is my boss <:GWvertiPeepoSadMan:405951684339302400> ');
		await message.guild.ban(user)
			
		return message.channel.send('I hate my work, today i had to ban ' +user+ ', I\'m so sad.');
	
	return;
}

function addUserRole(message) {
	const args = message.content.split(' ');
	var role = message.guild.roles.find( 'name' , args[1]);
	if(!role){
		return message.channel.send('Sorry I can\'t find this role.');
	}
	message.member.addRole(role.id);
	return message.channel.send('Job done sir.');
	
}



client.login(token);
