const { Client } = require('discord.js');
const client = new Client({ intents: 32509 });
const config = require('./config.json');
const hastebin = require("hastebin");
var detectLang = require('lang-detector');

client.on('ready', async () => {
    console.log('Logged in to Discord');
});
client.on("messageCreate", async (message) => {
    if(message.author.id === client.user.id) return;
        // detect if message contains @everyone or @here and return if true
        if(message.mentions.everyone || message.mentions.here) return;
        if (detectLang(message.content) === 'JavaScript' || detectLang(message.content) === 'C' || detectLang(message.content) === 'C++' || detectLang(message.content) === 'Python' || detectLang(message.content) === 'Java' || detectLang(message.content) === 'HTML' || detectLang(message.content) === 'CSS' || detectLang(message.content) === 'Ruby' || detectLang(message.content) === 'Go' || detectLang(message.content) === 'PHP') {
            // Upload code to hastebin.com
            


            hastebin.createPaste(message.content, {
                raw: true,
                contentType: 'text/plain',
                server: 'https://hastebin.com'
              }).then(haste => {
                var fixedcode = "```" + `${detectLang(message.content).toLowerCase()}` + `\n${message.content}` + '```';
                message.channel.send(fixedcode);
                message.channel.send(`From ${message.author.toString()}, ` + 'a web version is available: ' + haste);
                message.delete();
            }).catch(error => {
                // Handle error
                console.error(error);
            });
    

        } else {
           return;
        }

});

client.login(config.token);