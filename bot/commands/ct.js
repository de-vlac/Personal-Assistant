module.exports = {
    name: 'ct',
    description: 'Tosses a coin',
    async execute(message) {
        let sides = ['heads', 'tail'];
        let result = Math.floor((Math.random() * sides.length));
        const choice = message.content.split(' ')[1];
 
       
        if (!choice) return message.channel.send(`Please play with one of these responses: \`${sides.join(', ')}\``);
        if (!sides.includes(choice)) return message.channel.send(`Only these responses are accepted: \`${sides.join(', ')}\``);
 
        if (sides[result] === choice) {
            console.log(sides[result]);
            return message.channel.send('It landed on '+sides[result]+' therefore you won!');
        } else {
            return message.channel.send('It landed on '+sides[result]+' therefore I won!');
        }
       
    },
};
