const YouTube = require ('simple-youtube-api');

const search = new YouTube('AIzaSyArD7flXydcsIkuaybUoQq-rkeLaTNSZK0');

module.exports = {
	name: 'yt',
	description: 'Search a youtube vidéo !',
	async execute(message) {

		const args = message.content.split(' ')[1];
		const url = args.replace(/<(.+)>/g, '$1');

		try{
			var videos = await search.searchVideos(url, 1);
			var video = await search.getVideoByID(videos[0].id);
		} catch (error) {
			console.error(error);
			return message.channel.send('Alas I found nothing...');
		}
	  
	  	return message.channel.send(' ' +video.url);

 	},
};
