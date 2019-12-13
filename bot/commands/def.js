const urban = require("urban");
const {RichEmbed} = require("discord.js");

module.exports = {
	name: 'def',
	description: 'Finds a definition on urban dictionary',
	execute(message) {
		let search = urban(message.content.split(" ").slice(1).join(" "));
		let image = "http://cdn.marketplaceimages.windowsphone.com/v8/images/5c942bfe-6c90-45b0-8cd7-1f2129c6e319?imageType=ws_icon_medium";

		try{
			search.first(res => {
				if(!res) return message.channel.send("Sorry I didnt find any result for this topic");
				let {word,definition,example,thumbs_up,thumbs_down,permalink,author} = res
				let embed = new RichEmbed()
					.setColor('RANDOM')
					.setAuthor(`Urban Dictionary | ${word}`, image)
					.setThumbnail(image)
					.setDescription(`
					**Definition:** ${definition ||"No definition"} \n
					**Example:** ${example || "No example"} \n
					**Upvote:** ${thumbs_up || 0} \n
					**Downvote:** ${thumbs_down || 0} \n
					**Link:** [link to ${word}](${permalink || "https://www.urbandictionary.com/"})`)
					.setTimestamp()
					.setFooter(`Written by ${author || "unknown"}`);
			
				message.channel.send(embed);
			})
		} catch (error) {
			console.log(error);
			return message.channel.send("Try again sir I encountered an error");
		}
 },
};
