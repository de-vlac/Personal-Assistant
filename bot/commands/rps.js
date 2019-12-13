module.exports = {
    name: 'rps',
    description: 'Rock paper scissors game',
    async execute(message) {
        let replies = ['rock', 'paper', 'scissors'];
        let result = Math.floor((Math.random() * replies.length));
        const choice = message.content.split(' ')[1];
 
       
        if (!choice) return message.channel.send(`Please play with one of these responses: \`${replies.join(', ')}\``);
        if (!replies.includes(choice)) return message.channel.send(`Only these responses are accepted: \`${replies.join(', ')}\``);

 	message.channel.send('*Plays ' + replies[result] +'*');

        if (replies[result] === choice) {
            console.log(replies[result]);
            return message.channel.send('It\'s a tie! We had the same choice.');
        } else if (choice === 'rock') {
            console.log(replies[result]);
            if (replies[result] === 'paper') return message.channel.send('I won!');
            else return message.channel.send('You won!');
        } else if (choice === 'scissors') {
            console.log(replies[result]);
            if (replies[result] === 'rock') return message.channel.send('I won!');
            else return message.channel.send('You won!');
        } else if (choice === 'paper') {
            console.log(replies[result]);
            if (replies[result] === 'scissors') return message.channel.send('I won!');
            else return message.channel.send('You won!');
        }
    },
};
